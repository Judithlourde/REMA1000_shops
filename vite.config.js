import vue from '@vitejs/plugin-vue';

export default {
    plugins: [vue()],
    build: {
        chunkSizeWarningLimit: 1000,
    }
}
