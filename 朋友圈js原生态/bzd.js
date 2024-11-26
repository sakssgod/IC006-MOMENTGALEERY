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
                time: "1小时前",
                likes: ["摆渡人"],
                comments: [
                    { pname: "1号选手", comment: "又是一个周四！" }
                ]
            },
            {
                name: "2号选手",
                userpic: "https://pic3.zhimg.com/v2-d1928d1a4e0d849f7c6c49428d2e0411_r.jpg",
                content: "每天早上一杯怀姜杏仁臻白饮...",
                picUrl: ["https://img.zcool.cn/community/0195cf55792ace00000059ff8e3f7b.jpg"],
                time: "13分钟前",
                likes: [],
                comments: [
                    { pname: "2号选手", comment: "天空真好看" }
                ]
            },
            {
                name: "1号选手",
                userpic: "https://pic3.zhimg.com/v2-d1928d1a4e0d849f7c6c49428d2e0411_r.jpg",
                content: "今天周四啦",
                picUrl: ["https://img.zcool.cn/community/017445590a8752a80121455021e118.jpg"],
                time: "1小时前",
                likes: ["摆渡人"],
                comments: [
                    { pname: "1号选手", comment: "又是一个周四！" }
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
                <span>${post.time}</span>
                <button class="like-button" data-index="${index}">
                    ${post.likes.includes(data.username) ? "取消点赞" : "点赞"}
                </button>
                <button class="comment-button" data-index="${index}">评论</button>
            `;
            postDiv.appendChild(footerDiv);

            // 评论
            const commentsDiv = document.createElement('div');
            commentsDiv.className = 'comments';
            post.comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.innerHTML = `<strong>${comment.pname}:</strong> ${comment.comment}`;
                commentsDiv.appendChild(commentDiv);
            });
            postDiv.appendChild(commentsDiv);

            postList.appendChild(postDiv);
        });
    }

    renderPosts(data.posts);

    postList.addEventListener('click', (e) => {
        const target = e.target;
        const index = target.dataset.index;
        if (target.classList.contains('like-button')) {
            const post = data.posts[index];
            if (post.likes.includes(data.username)) {
                post.likes = post.likes.filter(user => user !== data.username);
            } else {
                post.likes.push(data.username);
            }
            renderPosts(data.posts);
        }

        if (target.classList.contains('comment-button')) {
            const comment = prompt("请输入评论：");
            if (comment) {
                data.posts[index].comments.push({ pname: data.username, comment });
                renderPosts(data.posts);
            }
        }
    });
});
