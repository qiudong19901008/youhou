

const src = 'https://sns-webpic-qc.xhscdn.com/202408030754/b339787e6dab3e5111a406331b0f87e5/1000g0082o8nt58cjq0005op9r20osrlbjj4nso0!nd_dft_wlteh_webp_3'
const a = (param:string)=>{
    const srcArr = param.split("/");
    if (srcArr.length >= 7){ // check if it's been processed
        return;
    }
    const newSrc = srcArr[0] + "//" + srcArr[2].replace("webpic", "img") + "/" + srcArr[5].split("!")[0] + "?imageView2/0/format/jpeg|imageMogr2/strip";
    console.log(newSrc);
}

export {}

// a(src);
// https://ci.xiaohongshu.com/1000g0082o8nt58cjq0005op9r20osrlbjj4nso0?imageView2/2/w/format/png
// node test.js
// https://sns-webpic-qc.xhscdn.com/202408030754/b339787e6dab3e5111a406331b0f87e5/1000g0082o8nt58cjq0005op9r20osrlbjj4nso0!nd_dft_wlteh_webp_3
// https://sns-img-qc.xhscdn.com/1000g0082o8nt58cjq0005op9r20osrlbjj4nso0?imageView2/0/format/jpeg|imageMogr2/strip