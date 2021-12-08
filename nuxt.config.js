export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.PACKAGE_NAME || '',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.PACKAGE_DESC || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    //TAMBAHKAN CODE INI UNTUK MENAMBAHKAN EKSTERNAL JAVASCRIPT
    script: [
      { src: "/vendor/jquery/jquery.min.js" },
      { src: "/vendor/bootstrap/js/bootstrap.bundle.min.js" },
      { src: "/vendor/jquery-easing/jquery.easing.min.js" },
      { src: "/js/sb-admin-2.min.js" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  //DAN LOAD FILE CSS DI DALAM ATTRIBUTE INI
  css: [
    '@/assets/vendor/fontawesome-free/css/all.min.css',
    '@/assets/css/sb-admin-2.min.css',
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js',
  ],
  router: {
    //middleware: ['auth']
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          required: false,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: 'auth/login', method: 'post', propertyName: 'token' },
          user: { url: 'auth/profile', method: 'get', propertyName: false },
          register: { url: 'auth/register', method: 'post', propertyName: false },
          logout: '/'
        }, 
      }
    },
    localStorage: false,
    redirect: {
      login: '/login', // User will be redirected to this path if login is required
      register: '/register', // User will be redirected to this path if login is required
      logout: '/', // User will be redirected to this path if after logout, current route is protected
      dashboard: '/' // User will be redirect to this path after login if accessed login page directly
    }, 
    watchLoggedIn: true,
    rewriteRedirects: true,
    resetOnError: true
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/svg', '@nuxtjs/color-mode'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt',
    '@nuxtjs/proxy'
  ],

  axios: {
    baseURL: process.env.API_URL, // Used as fallback if no runtime config is provided
    proxyHeaders: false,
    credentials: false,
    proxy: true
  },
  proxy: {
    '/api/': { target: process.env.API_URL, pathRewrite: { '^/api/': '' }, changeOrigin: true }
  },
  env:{
    BASE_URL:'//localhost:8080/',
    API_URL: 'http://localhost:8080/api/',
    PACKAGE_NAME: 'nuxt-vue',
    PACKAGE_DESC: 'Belajar',
    PAGE_SIZE:5,
  },
  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: process.env.BROWSER_BASE_URL
  //   }
  // },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
      API_URL:process.env.API_URL,
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}


/**
 * TO running server type: npm run dev
 * 
 */