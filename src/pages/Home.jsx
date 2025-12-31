import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { bestsellerIds, products } from '../data/products';
import { categories } from '../data/categories';

const Home = () => {
  const bestsellers = bestsellerIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96 flex items-center justify-center text-white"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fresh groceries. <br className="hidden sm:block" />
            Fast delivery. No hassle.
          </h1>

          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            High-quality produce, dairy, and essentials delivered straight to your door.
          </p>

          <Link
            to="/shop"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition"
          >
            Browse products
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
            Shop by category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {categories.map(category => (
              <CategoryCard
                key={category.slug}
                name={category.name}
                image={category.image}
                slug={category.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Promo */}
      <section className="py-14 bg-green-500 dark:bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">
            Weekly deals you can’t miss
          </h2>

          <p className="text-lg mb-6">
            Save up to 20% on selected organic vegetables.
          </p>

          <Link
            to="/shop"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-full transition"
          >
            View deals
          </Link>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-14 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-800 dark:text-white">
            Bestsellers
          </h2>

          <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
            Our most loved products, chosen by customers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
