import './bootstrap';
import '../css/app.css';

import { createRoot, hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme/theme';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { GlobalStyles } from './styles/global/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Function to resolve the page components dynamically
const resolvePage = async (name) => {
    try {
        if (name === 'BaseLayout') {
            // Special case for BaseLayout
            const module = await import(`./Layouts/BaseLayout`);
            return module.default;
        }

        // Try to import from the nested directory structure: ./Pages/name/name
        const module = await import(`./Pages/${name}/${name}`);
        return module.default;
    } catch (error) {
        console.error(`Error importing page ${name}:`, error);

        // If the first import fails, try to import from the flat structure: ./Pages/${name}
        try {
            const module = await import(`./Pages/${name}`);
            return module.default;
        } catch (error) {
            console.error(`Error importing page ${name} from flat structure:`, error);

            // If both imports fail, throw an error
            throw new Error(`Unknown page: ${name}`);
        }
    }
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: resolvePage,
    setup({ el, App, props }) {
        const root = import.meta.env.DEV ? createRoot(el) : hydrateRoot(el, <App {...props} />);

        root.render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <BrowserRouter>
                        <GlobalStyles />
                        <App {...props} />
                    </BrowserRouter>
                </Provider>
            </ThemeProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
