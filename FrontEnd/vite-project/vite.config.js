import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  commonjsOptions: {
    esmExternals: true,
 },
 build: {
  rollupOptions: {
    external: ['axios']
  }
}
})


// export default defineConfig({
//   build: {
//     rollupOptions: {
//       external: ['axios']
//     }
//   }
// });

