const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 */

mix
    // Set the public path
    .setPublicPath('assets/dist')
    
    // JS
    .js('assets/js/app.js', 'js')
    .js('assets/js/micro-interactions.js', 'js')
    .js('assets/js/menu-animations.js', 'js')
    .js('assets/js/parallax-effects.js', 'js')
    .js('assets/js/particle-system.js', 'js')
    .js('assets/js/scroll-animations.js', 'js')
    .js('assets/js/scroll-trigger.js', 'js')
    
    // CSS
    .postCss('assets/css/app.css', 'css', [
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer'),
    ])
    
    // Options
    .options({
        processCssUrls: false,
        terser: {
            extractComments: false,
        },
        postCss: [
            require('postcss-import'),
            require('tailwindcss'),
            require('autoprefixer'),
        ]
    })
    
    // Source maps in development
    .sourceMaps(false, 'source-map')
    
    // Version files
    .version()
    
    // Disable success notifications
    .disableSuccessNotifications();

// Hot reloading in development
if (mix.inProduction()) {
    mix.version();
} else {
    mix.webpackConfig({
        devtool: 'source-map'
    });
}

// Add additional webpack configuration
mix.webpackConfig({
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': __dirname + '/assets/js'
        },
    },
    output: {
        chunkFilename: 'js/chunks/[name].js',
    },
}); 