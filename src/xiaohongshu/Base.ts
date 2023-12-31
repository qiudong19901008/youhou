

export default class Base{
    // 获取搜索关键词
    protected getSearchKeyword = ()=> {
        var keywordInput = document.querySelector('.input-box input.search-input') as HTMLInputElement|null;
        if (!keywordInput) {
            return '';
        }
        return keywordInput.value.trim();
    }
}