// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2023-12-22
// @description  try to take over the world!
// @author       You
// @match        *://www.xiaohongshu.com/*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

   if (window.location.href.includes('/search_result') || window.location.href.includes('/profile/')) {
       // 第一个功能脚本 - 从小红书搜索页面提取笔记内容数据并导出为表格
       // 创建一个空数组，用于存储提取的数据
       let data = [];
       // 创建一个Set，用于存储已提取的笔记链接
       let extractedLinks = new Set();
       // 创建用于显示当前采集数量的元素
       const countElement = document.createElement("div");
       countElement.style.position = "fixed";
       countElement.style.bottom = "100px";
       countElement.style.left = "20px";
       countElement.style.zIndex = "9999";
       countElement.style.backgroundColor = "#fff";
       countElement.style.padding = "10px";
       countElement.style.borderRadius = "5px";
       countElement.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
       countElement.style.fontWeight = "bold";
       countElement.style.fontSize = "16px";
       countElement.style.color = "#333";
       document.body.appendChild(countElement);
       // 创建下载按钮
       const downloadBtn = document.createElement("button");
       downloadBtn.innerText = "下载数据";
       downloadBtn.style.position = "fixed";
       downloadBtn.style.bottom = "140px";
       downloadBtn.style.left = "20px";
       downloadBtn.style.zIndex = "9999";
       downloadBtn.style.backgroundColor = "#4CAF50";
       downloadBtn.style.color = "#fff";
       downloadBtn.style.border = "none";
       downloadBtn.style.borderRadius = "5px";
       downloadBtn.style.padding = "10px";
       downloadBtn.style.fontSize = "16px";
       downloadBtn.style.cursor = "pointer";
       downloadBtn.addEventListener("click", () => exportToCSV(data, 'note_data.csv'));
       document.body.appendChild(downloadBtn);
       // 添加表头
       data.push(['笔记标题', '笔记链接', '作者', '作者链接', '点赞数']);
       // 提取笔记内容数据
       let count = 0;
       // 计数器
       extractNoteData();
       // 监听页面滚动事件，当加载更多内容时，重新提取数据
       window.addEventListener("scroll", extractNoteData);
       // 导出函数，将数据导出为CSV文件
       function exportToCSV(data, filename) {
           // 删除第三行数据
           //data.splice(2, 1);
           // 添加BOM头以处理UTF-8编码
           const begin = "data:text/csv;charset=utf-8,\uFEFF";
           const content = data.map((row,i) => {

               const one =  row.join(",");
               console.log(i,one);
               return one;
                // const one = row[0]?row[0]:''
           }).join("\n");
           const csv = begin + content;

           const encodedUri = encodeURI(csv);
           const link = document.createElement("a");
           link.setAttribute("href", encodedUri);
           link.setAttribute("download", filename);
           document.body.appendChild(link);
           // 需要将链接元素添加到文档中才能生效
           link.click();
       }
       // 提取笔记内容数据
       function extractNoteData() {
           const noteElements = document.querySelectorAll('div[data-v-12cf638b]');
           noteElements.forEach(noteElement => {
               // 检查是否已提取过该笔记内容数据
               if (!noteElement.classList.contains('extracted')) {
                   // 提取标题和笔记链接
                   const titleElement = noteElement.querySelector('a.title span');
                   let title = titleElement ? titleElement.innerText : '';
                   const noteLink = titleElement ? 'https://www.xiaohongshu.com' + titleElement.closest('a.title').getAttribute('href') : '';
                   // 检查笔记链接是否已提取过
                   if (!extractedLinks.has(noteLink) && !title.startsWith('#')) {
                       title = title.replace(/#/g,'jin');
                       // 提取作者和作者链接
                       const authorElement = noteElement.querySelector('div.author-wrapper a.author');
                       const author = authorElement ? authorElement.querySelector('span.name').innerText : '';
                       const authorLink = authorElement ? 'https://www.xiaohongshu.com' + authorElement.getAttribute('href') : '';
                       // 提取点赞数
                       const likeElement = noteElement.querySelector('span.like-wrapper span.count');
                       let likeCount = likeElement ? likeElement.innerText : '';
                       if(likeCount.endsWith('w')){
                            likeCount = parseFloat(likeCount.replace('w','')) * 10000;
                       }
                       // 将提取的数据添加到数组中
                       data.push([title?title:'无', noteLink?noteLink:'无', author?author:'无', authorLink?authorLink:'无', likeCount?likeCount:0]);
                       // 将笔记链接添加到已提取的链接集合中
                       extractedLinks.add(noteLink);
                       // 标记为已提取
                       noteElement.classList.add('extracted');
                       // 增加计数器
                       count++;
                   }
               }
           });

           // 更新当前采集数量的显示
           countElement.innerText = "已采集：" + count + "条";
       }

       // 在每次重新打开页面时清除之前保存的数据和链接记录
       window.addEventListener("beforeunload", () => {
           data = [];
           extractedLinks = new Set();
       });
   } else if (window.location.href.includes('/explore/')) {
       // 第二个功能脚本 - 导出小红书笔记页面的图片和视频
       function exportImages() {
           var imageElements = document.querySelectorAll('.swiper-slide');
           var imageUrls = new Set();
           imageElements.forEach(function(element) {
               var backgroundImage = element.style.backgroundImage;
               var s= backgroundImage.match(/url\("(.+)"\)/)[1];
               imageUrls.add(imageUrl);
           });
           var titleElement = document.querySelector('.title');
           var pageTitle = titleElement.innerText.trim();
           var index = 1;
           imageUrls.forEach(function(imageUrl) {
               var imageName = pageTitle + '-' + index + '.png';
               GM_download({ url: imageUrl, name: imageName, saveAs: false });
               index++;
           });
       }
       // 导出视频（去重处理，并使用采集页面标题命名）
       function exportVideos() {
           var videoElements = document.querySelectorAll('video');
           var videoUrls = new Set();
           videoElements.forEach(function(element) {
               var videoUrl = element.src;
               videoUrls.add(videoUrl);
           });
           var titleElement = document.querySelector('.title');
           var pageTitle = titleElement.innerText.trim();
           var index = 1;
           videoUrls.forEach(function(videoUrl) {
               var videoName = pageTitle + '-' + index + '.mp4';
               GM_download({ url: videoUrl, name: videoName, saveAs: false });
               index++;
           });
       }
       // 创建下载按钮
       function createDownloadButton() {
           var button = document.createElement('button');
           button.textContent = '下载图片和视频';
           button.style.position = 'fixed';
           button.style.bottom = '20px';
           button.style.left = '20px';
           button.style.zIndex = '9999';
           button.style.padding = '10px 20px';
           button.style.border = 'none';
           button.style.backgroundColor = '#ff5a5f';
           button.style.color = '#fff';
           button.style.fontFamily = 'Arial, sans-serif';
           button.style.fontSize = '16px';
           button.style.fontWeight = 'bold';
           button.style.cursor = 'pointer';
           button.addEventListener('click', function() {
               exportImages();
               exportVideos();
           });
           document.body.appendChild(button);
       }
       // 检查当前页面是否匹配指定的链接格式
       function checkPage() {
           var currentURL = window.location.href;
           var pattern = /^https:\/\/www\.xiaohongshu\.com\/explore\/.*$/;
           return pattern.test(currentURL);
       }
       // 在页面加载完成后创建下载按钮
       window.addEventListener('load', function() {
           if (checkPage()) {
               createDownloadButton();
           }});
       }
       if (window.location.href.includes('/search_result')) {
           // 第三个功能脚本 - 在小红书搜索页面上添加其他搜索引擎的跳转链接按钮
           // 定义搜索引擎数据
           var searchEnginesData = [
               {name: "搜百度", url: "https://www.baidu.com/s?wd=" },
               {name: "搜知乎", url:"https://www.zhihu.com/search?type=content&q=" },
               {name: "搜抖音", url: "https://www.douyin.com/search/" },
               {name: "搜公号", url: "https://weixin.sogou.com/weixin?type=2&query=" }
               // 添加其他搜索引擎的数据，格式为 { name: "搜索引擎名称", url: "搜索引擎链接" }
           ];
               // 创建搜索引擎导航按钮
               function createSearchEngineButtons() {
                   var channelList = document.querySelector(".channel-list");
                   if (channelList) {
                       var buttonsWrapper = document.createElement("div");
                       buttonsWrapper.className = "search-engine-buttons";
                       // 查找目标位置的父节点
                       var parentElement = document.querySelector(".bottom-channel");
                       if (parentElement) {
                           parentElement.parentNode.insertBefore(buttonsWrapper, parentElement.nextSibling);
                       }
                       searchEnginesData.forEach(function(engine, index) {
                           var button = document.createElement("a");
                           button.textContent = engine.name;
                           button.href = "javascript:void(0);";
                           // 设置初始链接为javascript:void(0);
                           button.addEventListener("click", function() {
                               var keyword = getSearchKeyword();
                               if (keyword) {
                                   var url = engine.url + encodeURIComponent(keyword); window.open(url, "_blank");
                                   // 在新窗口或标签页中打开搜索引擎链接
                               }});
                               // 设置按钮样式
                               button.className = "search-engine-button";
                               button.classList.add("large-button");
                               if (index === 2 || index === 3) {
                                   button.classList.add("bottom-row");
                               }
                               buttonsWrapper.appendChild(button);
                           });
                       }}
                       // 获取搜索关键词
                       function getSearchKeyword() {
                           var keywordInput = document.querySelector('.input-box input.search-input');
                           if (keywordInput) {
                               return keywordInput.value.trim();
                           }
                           return "";
                       }
                       // 添加搜索按钮样式
                       var styleElement = document.createElement("style");
                       styleElement.textContent = ` .search-engine-buttons { display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 10px; } .search-engine-button { display: inline-block; width: calc(50% - 10px); padding: 10px; background-color: #4caf50; border-radius: 8px; color: #fff !important; font-size: 18px; text-align: center; text-decoration: none; cursor: pointer; transition: background-color 0.2s; margin-bottom: 0px; } .search-engine-button.large-button { padding: 10px; } .search-engine-button.bottom-row { margin-top: 5px; } .search-engine-button:hover { background-color: #365843; }`;
                       document.head.appendChild(styleElement);
                       // 主程序
                       function main() {
                           createSearchEngineButtons();
                       }
                       // 在页面加载完成后执行主程序
                       window.addEventListener("load", main);
                   }


   })();