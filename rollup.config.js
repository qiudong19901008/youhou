import typescript from "@rollup/plugin-typescript";
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'; // 引入 nodeResolve 插件
// import { terser } from '@rollup/plugin-terser'; // 引入 terser 插件，用于压缩代码
import terser from '@rollup/plugin-terser'; // 引入 terser 插件，用于压缩代码


const config = [
    //1
    {
        input: 'src/api/XHSApi.ts',
        output: [
            {
                file: './dist/dist_xhs.js',
                // format: 'es',
                // sourcemap: true,
            }
        ],
        plugins: [
            
            // babel({
            //     exclude: 'node_modules/**',
            // }),
            typescript({
                tsconfig: './tsconfig.json',
                include:'src/**'
            }),
            commonjs(),
            nodeResolve(
                {
                    jsnext: true,
                    main: true,
                    browser: true
                }
            ),
            // 脚本不能使用压缩
            // terser({
            //     compress:true, //压缩
            //     mangle:true, //混淆
            // }),
        ],
        external: ['xlsx','jszip'],
    },

    //2
    // {
    //     input: 'src/douyin/index.ts',
    //     output: [
    //         {
    //             file: './dist/dist_douyin.js',
    //             // format: 'es',
    //             // sourcemap: true,
    //         }
    //     ],
    //     plugins: [
    //         babel({
    //             exclude: 'node_modules/**',
    //         }),
    //         typescript({
    //             tsconfig: './tsconfig.json'
    //         }),
    //         commonjs(),
    //         nodeResolve({
    //             jsnext: true,
    //             main: true,
    //             browser: true
    //         })
    //     ]
    // },
   
    //3
    // {
    //     input: 'src/bili/index.ts',
    //     output: [
    //         {
    //             file: './dist/dist_bili.js',
    //             // format: 'es',
    //             // sourcemap: true,
    //         }
    //     ],
    //     plugins: [
    //         babel({
    //             exclude: 'node_modules/**',
    //         }),
    //         typescript({
    //             tsconfig: './tsconfig.json'
    //         }),
    //         commonjs(),
    //         nodeResolve({
    //             jsnext: true,
    //             main: true,
    //             browser: true
    //         })
    //     ]
    // },
]


export default config;