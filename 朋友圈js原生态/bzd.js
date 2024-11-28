
document.addEventListener("DOMContentLoaded", () => {
    const postList = document.getElementById('post-list');

    const data = {
        username: "摆渡人",
        posts: [
            {
                name: "1号选手",
                userpic: "https://pic3.zhimg.com/v2-d1928d1a4e0d849f7c6c49428d2e0411_r.jpg",
                content: "今天周四啦",
                picUrl: ["https://img.zcool.cn/community/017445590a8752a80121455021e118.jpg"],
                time: "1 hour ago",
                likes: ["2号选手", "蛋糕形的微波炉"],
                comments: [
                    { pname: "1号选手", comment: "又是一个周四！" },
                    { pname: "我是你爹", comment: "这是哪里呀 老铁" }
                ]
            },
            {
                name: "2号选手",
                userpic: "https://pic3.zhimg.com/v2-d1928d1a4e0d849f7c6c49428d2e0411_r.jpg",
                content: "每天早上一杯怀姜杏仁臻白饮...",
                picUrl: ["https://img.zcool.cn/community/0195cf55792ace00000059ff8e3f7b.jpg"],
                time: "13 mim ago",
                likes: [],
                comments: [
                    { pname: "2号选手", comment: "天空真好看" },
                    { pname: "1号选手", comment: "你模仿我！" },
                    { pname: "我是你爹", comment: "woca www" }
                
                ]
            }
        ]
    };

    function renderPosts(posts) {
        postList.innerHTML = "";
        posts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';

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
            const comment = prompt("请输入评论：");
            if (comment) {
                data.posts[index].comments.push({ pname: data.username, comment });
                renderPosts(data.posts);
            }
        }
    });
});
