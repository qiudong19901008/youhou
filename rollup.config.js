import typescript from "@rollup/plugin-typescript";
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
// import dts from "rollup-plugin-dts";
// import XLSX from 'xlsx';


const config = [
    //1
    {
        input: 'src/xiaohongshu/index.ts',
        output: [
            {
                file: './dist/dist_xiaohongshu.js',
                // format: 'es',
                // sourcemap: true,
            }
        ],
        external: ['XLSX'],
        // globals: {
        //     XLSX
        // },
        plugins: [
            
            babel({
                exclude: 'node_modules/**',
            }),
            typescript({
                tsconfig: './tsconfig.json'
            }),
            commonjs(),
            nodeResolve({
                jsnext: true,
                main: true,
                browser: true
            }),
            // terser(),
        ]
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