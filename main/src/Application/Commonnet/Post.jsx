import React, { useMemo, useState } from "react";
import Gallery from "./Gallery.jsx";
import Comment from "./Comment.jsx";

export default function Post({ post, Users, CNtheme, setPage, style }) {


let randomNum = Math.floor(Math.random() * 1000000)
  const user = useMemo(() => {
    return Users?.find((u) => u.id === post.uid) ?? {
    "id": randomNum,
    "n": `User${randomNum}`,
    "un": `User${randomNum}`,
    "bio": null,
    "pfp": "https://picsum.photos/200?random=2",
    "fer": 0,
    "ing": 0,
    "loc": "NewYork, USA"
  }}, [Users, post.uid]);
 

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const [readMore, setReadMore] = useState(false);

  let text_limit = 50;
  const isLongText = post?.c?.length > text_limit;

  function onError(e) {
    e.target.onerror = null;
    e.target.src = `${import.meta.env.BASE_URL}/pfp/D.png`;
  }

  const profileClick = () => {
    if (user?.un) {
      setPage({type: "profile", userId: user.id})
    }
  }

  return (
    <div
      key={post.id}
      className="rounded-2xl border border-white/10 inter w-7/8 m-2 flex overflow-hidden justify-center flex-col"
      style={{
        color: CNtheme.text,
        backgroundColor: CNtheme.pri,
        boxShadow: `1px 1px 10px 1px ${CNtheme.shadow}`,
        border: `1px solid ${CNtheme.shadow}`,
        ...style
      }}
    >
      <div className="flex items-center">
        <img
          src={user?.pfp || "https://picsum.photos/200"}
          className="rounded-full h-11 w-11 mx-2 mt-2"
          onError={onError}
          style={{ border: `1px solid ${CNtheme.text}` }}
        />
        <div className="relative">
          <p className="text-sm hover:underline ">{user?.n || user?.un || `User${user?.id}`}</p>
          <p className="text-[10px] opacity-60">@{user?.un}</p>
          <button className="inset-0 absolute cursor-pointer " onClick={() => profileClick()}></button>
        </div>
        <div className="pl-2">
          {user?.v ? (
            <span
              className="material-symbols-outlined"
              style={{ color: CNtheme.yellow }}
            >
              verified
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col mt-1 ml-1 items-start">
        <p
          style={{ textIndent: "2em" }}
          className={`${isLongText && !readMore ? "line-clamp-2" : ""}`}
        >
          {post.c}
        </p>

        {isLongText && (
          <button onClick={() => setReadMore((prev) => !prev)} className="mt-1">
            <p className="text-[12px] opacity-75 hover:opacity-90 hover:underline">
              {readMore ? "Show Less" : "Read More"}
            </p>
          </button>
        )}
      </div>

      <div>
        <Gallery media={post.m} />
      </div>

      <div className="flex gap-[1em] mt-3 ml-1 text-sm relative ">
        {post.l !== undefined && (
          <div className="flex">
            <button onClick={() => setLike((prev) => !prev)}>
              <span
                className="material-symbols-outlined"
                style={{
                  color: like ? CNtheme.yellow : CNtheme.text,
                  opacity: like ? "100%" : "25%",
                }}
              >
                {like ? "Mood" : "add_reaction"}
              </span>
            </button>
            <p className="ml-1">{like ? post.l + 1 || 1 : post.l || 0}</p>
          </div>
        )}
        {post.dl !== undefined && (
          <div className="flex ">
            <button onClick={() => setDislike((prev) => !prev)}>
              <span
                className="material-symbols-outlined"
                style={{
                  color: dislike ? CNtheme.blue : CNtheme.text,
                  opacity: dislike ? "100%" : "25%",
                }}
              >
                {dislike ? "sentiment_sad" : "sentiment_dissatisfied"}
              </span>
            </button>
            <p className="ml-1">{dislike ? post.dl + 1 || 1 : post.dl || 0}</p>
          </div>
        )}
        <p className="absolute bottom-1 right-7 flex center">
          {post.v && (
            <span
              className="material-symbols-outlined mr-1 opacity-25"
              style={{ color: CNtheme.text }}
            >
              visibility
            </span>
          )}
          {post.v || null}
        </p>
      </div>
      <hr className="opacity-[20%]" />
      {post.com?.map((c) => (
        <Comment
          c={c}
          Users={Users}
          key={c.id}
          CNtheme={CNtheme}
          onError={onError}
        />
      ))}
    </div>
  );
}
