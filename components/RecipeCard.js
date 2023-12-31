import Link from 'next/link';
import Image from 'next/image';

export default function RecipeCard({ recipe }) {
  const { title, slug, cookingTime, thumbnail } = recipe.fields;

  return (
    <div className="card">
      <div className="featured">
        <Image
          src={'https:' + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
          alt={title}
        />
      </div>
      <div className="content">
        <div className="info">
          <h3>{title}</h3>
          <p>Takes approx. {cookingTime} mins to make</p>
        </div>
        <div className="actions">
          <Link className="btn-primary" href={/recipes/ + slug}>
            Cook This Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}
