import { defineConfig } from 'cypress';

export default defineConfig({
    video: false,
    viewportWidth: 1400,
    viewportHeight: 900,
    env: {
        'cypress/globals': true,
    },

    e2e: {
        baseUrl: 'http://localhost:3000',
    },
});
