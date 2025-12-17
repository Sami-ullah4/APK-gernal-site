export default async function singleCategory({ params }) {
  const { slug } = await params;
  return <div className="pt-20">Single Post Page for {slug}</div>;
}
