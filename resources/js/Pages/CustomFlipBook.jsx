// CustomHTMLFlipBook.jsx
import React, {
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
    forwardRef,
    memo,
} from 'react';
import { PageFlip } from 'page-flip';

const HTMLFlipBookForward = forwardRef((props, ref) => {
    const htmlElementRef = useRef(null);
    const childRef = useRef([]);
    const pageFlip = useRef();
    const [pages, setPages] = useState([]);

    // Expose pageFlip instance to parent using useImperativeHandle
    useImperativeHandle(ref, () => ({
        pageFlip: () => pageFlip.current,
    }));

    const refreshOnPageDelete = useCallback(() => {
        if (pageFlip.current) {
            pageFlip.current.clear();
        }
    }, []);

    const removeHandlers = useCallback(() => {
        const flip = pageFlip.current;
        if (flip) {
            flip.off('flip');
            flip.off('changeOrientation');
            flip.off('changeState');
            flip.off('init');
            flip.off('update');
        }
    }, []);

    // Render children and keep references for each page
    useEffect(() => {
        childRef.current = [];

        if (props.children) {
            const childList = React.Children.map(props.children, (child) => {
                return React.cloneElement(child, {
                    ref: (dom) => {
                        if (dom) {
                            childRef.current.push(dom);
                        }
                    },
                });
            });

            if (!props.renderOnlyPageLengthChange || pages.length !== childList.length) {
                if (childList.length < pages.length) {
                    refreshOnPageDelete();
                }
                setPages(childList);
            }
        }
    }, [props.children, pages.length, props.renderOnlyPageLengthChange, refreshOnPageDelete]);

    useEffect(() => {
        const setHandlers = () => {
            const flip = pageFlip.current;
            if (flip) {
                if (props.onFlip) flip.on('flip', props.onFlip);
                if (props.onChangeOrientation) flip.on('changeOrientation', props.onChangeOrientation);
                if (props.onChangeState) flip.on('changeState', props.onChangeState);
                if (props.onInit) flip.on('init', props.onInit);
                if (props.onUpdate) flip.on('update', props.onUpdate);
            }
        };

        if (pages.length > 0 && childRef.current.length > 0) {
            removeHandlers();

            if (htmlElementRef.current && !pageFlip.current) {
                pageFlip.current = new PageFlip(htmlElementRef.current, props);
            }

            if (!pageFlip.current.getFlipController()) {
                pageFlip.current.loadFromHTML(childRef.current);
            } else {
                pageFlip.current.updateFromHtml(childRef.current);
            }

            setHandlers();
        }
    }, [pages, props, removeHandlers]);

    return (
        <div ref={htmlElementRef} className={props.className} style={props.style}>
            {pages}
        </div>
    );
});

// Export the memoized version of the component
export const HTMLFlipBook = memo(HTMLFlipBookForward);
