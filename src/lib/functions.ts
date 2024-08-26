export const f_showLoading = ()=>{
    const loading = document.getElementById('ajaxLoading') as HTMLElement ;
    loading.style.display = 'block';
  }
  
export const f_hideLoading = ()=>{
    const loading = document.getElementById('ajaxLoading') as HTMLElement ;
    loading.style.display = 'none';
}
export const  f_jointMultiplePath = (...pathArr:string[])=>{
  let finalPath='';
  
  // 过滤 undefined null 
  pathArr = pathArr.filter((path)=>{
    return isNotVoid(path)
  })

  //去除所有 /
  for(let i=0,size=pathArr.length;i<size;i++){
    let path = pathArr[i];
    const firstChar = path.charAt(0);
    if(i!==0 && firstChar === '/'){
      path = path.substring(1,path.length);
    }
    const lastChar = path.charAt(path.length-1);
    if(i!==size-1 && lastChar === '/'){
      path = path.substring(0,path.length-1);
    }
    finalPath+=path+'/';
  }
  return finalPath.substring(0,finalPath.length-1);
}

const isVoid = (value:any) => {
  if(value === undefined){
    return true;
  }
  if(value === null){
    return true;
  }
  //因为 /tiebaPost/list?name=&remark=&status=0这种格式name和remark会获得空字符串
  if(value === ''){
    return true;
  }
  return false;
}

const isNotVoid = (value:any)=>{
  return !isVoid(value);
}