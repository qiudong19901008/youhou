import typescript from "@rollup/plugin-typescript";
// import dts from "rollup-plugin-dts";

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
        plugins: [
            typescript({
                tsconfig: './tsconfig.json'
            })
        ]
    },
   
]


export default config;