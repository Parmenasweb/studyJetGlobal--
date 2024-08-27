


export default async function Blog({params}) {
    const blog = await BlogPostCard.findOne({
        slug: params.slug
    });

    if(!blog) {
        return <p>Blog not found!</p>
    }

    return (
        <section className="py-24">
            <div className="container">
                <h1 className="text-4xl font-bold">{blog.title}</h1>
                <div className="prose mt-4" dangerouslySetInnerHTML={{__html: blog.content}}></div>
            </div>
            {/* related posts section goes here  */}
            {/* comment section */}
        </section>
    )
}