
document.addEventListener("DOMContentLoaded", () => {
    const updateLink = document.querySelector('.header-bar a[data-target="../html/ImportPhotosPage.html"]');
    const popupWindow = document.querySelector('.popup-window');
    const overlay = document.querySelector('.overlay');
    const textarea = popupWindow.querySelector('textarea');
    const publishButton = popupWindow.querySelector('.popup-controls button');
    const postList = document.getElementById('post-list');
    const data = {
        username: "Me",
        posts: [

            {
                name: "Banan_Cat",
                userpic: "../Images/头像1.jpeg",
                content: "This  is so BEAUTIFUL, My heart got cleaned :)",
                picUrl: ["../风景照片/2.jpg"],
                time: "Just now",
                likes: [],
                comments: [
                    
                ]
            },
            
            {
                name: "OuJie Wu",
                userpic: "https://pic3.zhimg.com/v2-d1928d1a4e0d849f7c6c49428d2e0411_r.jpg",
                content: "Oh Yeah!!!",
                picUrl: ["https://img.zcool.cn/community/017445590a8752a80121455021e118.jpg"],
                time: "1 hour ago",
                likes: ["Ayi Li", "Not me"],
                comments: [
                    { pname: "OuJie Wu", comment: "Another  thursday!" },
                    { pname: "Not Me", comment: "Where it is maan" }
                ]
            },
            {
                name: "Ayi Li",
                userpic: "../婚纱照片/casamento.jpg",
                content: "Another day of my life :D",
                picUrl: ["https://img.zcool.cn/community/0195cf55792ace00000059ff8e3f7b.jpg"],
                time: "13 mins ago",
                likes: [],
                comments: [
                    { pname: "OuJie Wu", comment: "The Sky is so beatiful" },
                    { pname: "Ayi Li", comment: "U copying me!" },
                    { pname: "Not Me", comment: "<3" }
                
                ]
            }
        ]
    };

    function renderPosts(posts) {
        postList.innerHTML = "";
        posts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.className = `post ${index === 0 ? 'hidden' : ''}`; // 隐藏第一个帖子
            postDiv.style.display = index === 0 ? 'none' : 'block'; // 初始状态

            // 用户信息
            const userDiv = document.createElement('div');
            userDiv.className = 'post-header';
            userDiv.innerHTML = `
                <img src="${post.userpic}" class="userpic" alt="${post.name}">
                <span class="listname">${post.name}</span>
            `;
            postDiv.appendChild(userDiv);

            // 内容
            const contentDiv = document.createElement('div');
            contentDiv.className = 'post-content';
            contentDiv.textContent = post.content;
            postDiv.appendChild(contentDiv);

            // 图片
            const imagesDiv = document.createElement('div');
            imagesDiv.className = 'post-images';
            post.picUrl.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                imagesDiv.appendChild(img);
            });
            postDiv.appendChild(imagesDiv);

            // 底部区域（时间、操作）
            const footerDiv = document.createElement('div');
            footerDiv.className = 'post-footer';
            footerDiv.innerHTML = `
                <span class="post-time">${post.time}</span>
                <button class="toggle-menu" data-index="${index}">...</button>
                <div class="footer-buttons hidden">
                    <button class="like-button" data-index="${index}">
                        ${post.likes.includes(data.username) ? "Dislike" : "Like"}
                    </button>
                    <button class="comment-button" data-index="${index}">Comment</button>
                </div>
            `;
            postDiv.appendChild(footerDiv);

            // 点赞用户和评论区域
            const interactionDiv = document.createElement('div');
            interactionDiv.className = 'interaction-area';

            // 点赞用户区域
            const likesDiv = document.createElement('div');
            likesDiv.className = 'likes';
            if (post.likes && post.likes.length > 0) {
                likesDiv.innerHTML = `<span>❤️ ${post.likes
                    .map(user => `<span class="comment-user">${user}</span>`)
                    .join(", ")}</span>`;
            } else {
                likesDiv.innerHTML = `<span>Nobody liked yet</span>`;
            }
            
            interactionDiv.appendChild(likesDiv);

            // 评论区域
            const commentsDiv = document.createElement('div');
            commentsDiv.className = 'comments';
            post.comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.innerHTML = `<strong><span class="comment-user">${comment.pname}</span>:</strong> ${comment.comment}`;
                commentsDiv.appendChild(commentDiv);
            });
            
            interactionDiv.appendChild(commentsDiv);

            postDiv.appendChild(interactionDiv);
            postList.appendChild(postDiv);
        });
    }

    renderPosts(data.posts);

    postList.addEventListener('click', (e) => {
        const target = e.target;

        // 切换按钮显示/隐藏
        if (target.classList.contains("toggle-menu")) {
            const footerButtons = target.nextElementSibling;
            if (footerButtons.classList.contains("hidden")) {
                footerButtons.classList.remove("hidden");
            } else {
                footerButtons.classList.add("hidden");
            }
        }

        // 点赞功能
        if (target.classList.contains("like-button")) {
            const index = target.dataset.index;
            const post = data.posts[index];
            if (post.likes.includes(data.username)) {
                post.likes = post.likes.filter(user => user !== data.username);
            } else {
                post.likes.push(data.username);
            }
            renderPosts(data.posts);
        }

        // 评论功能
        if (target.classList.contains("comment-button")) {
            const index = target.dataset.index;
            const comment = prompt("write down a comment：");
            if (comment) {
                data.posts[index].comments.push({ pname: data.username, comment });
                renderPosts(data.posts);
            }
        }
    });

    updateLink.addEventListener('click', (event) => {
        event.preventDefault();
        popupWindow.classList.add('active');
        overlay.classList.add('active');
    });

    publishButton.addEventListener('click', () => {
        const content = textarea.value.trim();
        if (content) {
            const post = data.posts[0]; // 更新第一个帖子
            post.content = content;
            post.time = new Date().toLocaleString();

            const firstPost = postList.querySelector('.post.hidden');
            if (firstPost) {
                firstPost.classList.remove('hidden');
                firstPost.style.display = 'block';
            }

            localStorage.setItem('posts', JSON.stringify(post));
            textarea.value = ''; // 清空输入框
            popupWindow.classList.remove('active');
            overlay.classList.remove('active');
            alert('post with success!');
        } else {
            alert('content empty！');
        }
    });

    overlay.addEventListener('click', () => {
        popupWindow.classList.remove('active');
        overlay.classList.remove('active');
    });

    function closePopup() {
        const popupWindow = document.querySelector('.popup-window');
        const overlay = document.querySelector('.overlay');
        popupWindow.classList.remove('active'); // 隐藏弹窗
        overlay.classList.remove('active'); // 隐藏遮罩
    }
    
    // 为取消按钮绑定事件（如果需要）
    document.querySelector('.cancel-button').addEventListener('click', closePopup);
    
});


