export const f_showLoading = ()=>{
    const loading = document.getElementById('ajaxLoading') as HTMLElement ;
    loading.style.display = 'block';
  }
  
export const f_hideLoading = ()=>{
    const loading = document.getElementById('ajaxLoading') as HTMLElement ;
    loading.style.display = 'none';
}