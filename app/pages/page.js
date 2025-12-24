export default async function Page() {

    if (!page) return <p>Page not found</p>;

    return (
        <section className="max-w-4xl mx-auto prose">
            <h1>page.title</h1>
           
        </section>
    );
}