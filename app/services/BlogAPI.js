import axios from 'axios';

import {CLIENT_ID, CLIENT_SECRET, FB_PROVIDER, GRANT_TYPE} from "../config/global";

export const URI = "http://192.168.1.5:8000";

export function getPostsList(page = 1,token) {
    return axios.get(URI + '/api/posts?page='+page,{
        headers: {
            Authorization: `Bearer ${token}`
        }})
        .then(response => response.data)
        .catch(error => error);
}


export function getPost(id, token) {
    return new Promise((resolve, reject) => {
        axios.get(URI + "/api/posts/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function getImage(id, type = "post") {
    if (type === "post")
        return URI + "/images/" + id + ".png";
    return URI + "/images/users/" + id;
}

export function registerUser(data) {
    return new Promise((resolve, reject) => {
        axios.post(URI + "/api/register/", data)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function loginUser(data) {
    return new Promise((resolve, reject) => {
        axios.post(URI + "/api/login/", data)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function uploadUserImage(image, token) {
    return new Promise((resolve, reject) => {
        axios.post(URI + "/api/user/defaultAvatar",image,{
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function getUser(token) {
    return new Promise((resolve, reject) => {
        axios.get(URI + "/api/user/",{
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function getPostsByIdList(data, token) {
    return new Promise((resolve, reject) => {
        axios.post(URI + "/api/posts/list_id",data,{
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function getFavoritePosts(page = 1,token) {
    return new Promise((resolve, reject) => {
        axios.get(URI + "/api/favorites?page="+page,{
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function addPostToFavorite(postId, token){
    return new Promise((resolve, reject) => {
        axios.post(URI + "/api/favorites/add",{post_id: postId}, {
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function removePostFromFavorite(postId, token){
    return new Promise((resolve, reject) => {
        axios.delete(URI + "/api/favorites/delete/"+postId,{
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function searchForPosts(text, token) {
    return new Promise((resolve, reject) => {
        axios.get(URI + "/api/search/posts?text="+text,{
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function getComments(post_id, page = 1, token) {
    return new Promise((resolve, reject) => {
        axios.get(URI + `/api/posts/${post_id}/comments?page=${page}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function makeComment(post_id,comment, evaluation, token) {
    return new Promise((resolve, reject) => {
        axios.post(URI + "/api/posts/comments",
            {
                post_id,
                comment,
                evaluation,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function react(reaction, comment_id, token) {
    return new Promise((resolve, reject) => {
        axios.post(URI + "/api/reactions", {
            reaction,
            comment_id
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function makeCommentReply(reply, comment_id, token) {
    return new Promise((resolve, reject) => {
        axios.post(URI + "/api/responses", {
            response: reply,
            comment_id
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function getReplies(comment_id, page, token){
    return new Promise((resolve, reject) => {
        axios.get(URI + `/api/responses/${comment_id}?page=${page}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function socialLogin(accessToken) {
    return new Promise((resolve, reject) => {
        axios.post(URI + "/oauth/token",{
            grant_type: GRANT_TYPE,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            provider: FB_PROVIDER,
            access_token: accessToken,
        })
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}