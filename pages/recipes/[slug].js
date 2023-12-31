import { createClient } from 'contentful';
import Image from 'next/image';
import Skeleton from '../../components/Skeleton';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

// done at build time
export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'recipe',
  });

  const paths = res.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': params.slug,
  });

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { recipe: items[0] },
    revalidate: 10,
  };
}

export default function RecipeDetails({ recipe }) {
  if (!recipe) return <Skeleton />;

  const { featuredImage, title, cookingTime, ingredients, method } =
    recipe.fields;

  return (
    <div>
      <div className="banner">
        <Image
          src={'https:' + featuredImage.fields.file.url}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
          alt={title}
        />
        <h1>{title}</h1>
      </div>

      <div className="info">
        <p>Takes approx. {cookingTime} mins to make</p>
        <h3>Ingredients:</h3>
        {ingredients.map((ing) => (
          <span key={ing}>{ing}</span>
        ))}
      </div>

      <div className="method">
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>

      <style jsx>
        {`
          .info span::after {
            content: ', ';
          }
          .info span:last-child::after {
            content: '.';
          }
        `}
      </style>
    </div>
  );
}
