import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import SanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(SanityClient);
function urlFor(source){
 return builder.image(source)
}

export default function SinglePost(){
 const [SinglePost, setSinglePost] = useState(null);
 const [slug] = useParams();

 useEffect(()=>{
  SanityClient.fetch(`*[_slug.current == "${slug}"]{
   title,
   _Id,
   slug,
   mainImage{
    asset ->{
     _Id
     url
    }
   },
   body,
   "name": author->name,
   "authorImage": author->,
  }
  `)
  .then((data) => setSinglePost(data[0]))
  .catch(console.error);
 },[slug]);
 if (!SinglePost) return <div>Loading.....</div>;

 return(
  <main className="bg-gray-200 min-h-screen p-12">
   <article className="container shawdow-lg mx-auto bg-green-100 rounded-lg">
    <header className="relative">
     <div className="absolute h-full w-full flex items-center justify-center p-8">
      <div className="bg-white bg-opacity-75 rounded p-12">
       <h1 className="cursive text-3xl lg:text-6xl mb-4">{SinglePost.title}</h1>

       <div className="flex justify-center text-gray-800"> 
        <img src={urlFor(SinglePost.authorImage).url()} alt={SinglePost.name} className="w-10 h-10 rounded-full"/> 
       <p className="cursive flex items-center pl-2 text-2xl">{SinglePost.name}</p>
       </div>
       
      </div>
     </div>
     <img src={SinglePost.mainImage.asset.url} alt={SinglePost.title} className="w-full object--cover rounded-t"
     style={{height:"400px"}}/>
    </header>
    <div className="px-16 lg:px-48 py-2 lg:py-20 prose lg:prose-xl max-w-full"><BlockContent blocks={SinglePost.body} projectId="gjnk7byl" dataset="production"/></div>
   </article>
  </main>
 );
}