import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  ChartBarIcon,
  ClipboardIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export const Dashboard = () => {
  const { logout } = useAuth();

  const menuItems = [
    {
      name: 'Myセグメント',
      description: 'お気に入りのセグメントを管理',
      href: '/segments',
      icon: ChartBarIcon,
    },
    {
      name: 'テンプレート',
      description: '条件テンプレートを管理',
      href: '/templates',
      icon: ClipboardIcon,
    },
    {
      name: '複合条件検索',
      description: '条件を組み合わせて検索',
      href: '/search',
      icon: MagnifyingGlassIcon,
    },
    {
      name: 'プロフィール',
      description: 'プロフィール設定',
      href: '/profile',
      icon: UserIcon,
    },
  ];

  return (
    <div>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">SEG-LINK</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <div className="flex-shrink-0">
                    <item.icon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500 truncate">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 