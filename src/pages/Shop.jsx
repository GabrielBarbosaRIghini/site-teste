import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { useMemo, useState } from 'react';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');

  const [categoryFilter, setCategoryFilter] = useState(urlCategory || 'all');
  const [sortOption, setSortOption] = useState('default');

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (categoryFilter !== 'all') {
      list = list.filter(p => p.category === categoryFilter);
    }

    switch (sortOption) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return list;
    }
  }, [categoryFilter, sortOption]);

  return (
    <main className="py-10 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-600 dark:text-green-400">
          All Products
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map(c => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Sort by
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700"
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
              <option value="name-desc">Name: Z–A</option>
            </select>
          </div>
        </div>

        {filteredProducts.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No products found.
          </p>
        )}
      </div>
    </main>
  );
};

export default Shop;
