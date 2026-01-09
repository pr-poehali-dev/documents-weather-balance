import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type Document = {
  id: string;
  type: 'passport' | 'podorozhnik' | 'medical';
  data: any;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [podorozhnikBalance, setPodorozhnikBalance] = useState(250);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [hasAddress, setHasAddress] = useState(false);
  const [city, setCity] = useState('Санкт-Петербург');

  const weatherData = {
    temperature: -5,
    condition: 'Облачно',
    icon: 'Cloud',
  };

  const volunteerTasks = [
    {
      id: 1,
      title: 'Помощь в приюте для животных',
      district: 'Невский район',
      date: '15 января',
      participants: 5,
    },
    {
      id: 2,
      title: 'Уборка парка 300-летия',
      district: 'Приморский район',
      date: '18 января',
      participants: 12,
    },
    {
      id: 3,
      title: 'Помощь пожилым людям',
      district: 'Центральный район',
      date: '20 января',
      participants: 8,
    },
  ];

  const handleAddBalance = () => {
    setPodorozhnikBalance((prev) => prev + 100);
    toast.success('Баланс пополнен на 100₽');
  };

  const handleVolunteerApply = (taskTitle: string) => {
    toast.success(`Заявка на "${taskTitle}" отправлена! Ожидайте подтверждения.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pb-20">
      <div className="max-w-md mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="home">
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-slate-800">Петербуржец</h1>
              {!hasAddress && (
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    setHasAddress(true);
                    toast.success('Адрес добавлен: ул. Невский пр., д. 1, кв. 10');
                  }}
                >
                  <Icon name="Plus" size={20} />
                </Button>
              )}
            </div>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl border-0 hover-scale transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="CreditCard" size={24} />
                    Подорожник
                  </CardTitle>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    Активна
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-green-100 text-sm mb-1">Баланс</p>
                    <p className="text-4xl font-bold">{podorozhnikBalance} ₽</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleAddBalance}
                      className="flex-1 bg-white text-green-600 hover:bg-green-50"
                    >
                      Пополнить
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/20">
                      История
                    </Button>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                      <Icon name="QrCode" size={96} className="text-green-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-blue-100 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Icon name="CloudSun" size={24} className="text-blue-500" />
                  Погода в {city}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-5xl font-bold text-slate-800">{weatherData.temperature}°</p>
                    <p className="text-slate-600 mt-2">{weatherData.condition}</p>
                  </div>
                  <Icon name={weatherData.icon as any} size={80} className="text-blue-400" />
                </div>
              </CardContent>
            </Card>

            {hasAddress && (
              <Card className="shadow-lg border-2 border-purple-100 animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Icon name="Home" size={24} className="text-purple-500" />
                    Мой адрес
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-3">Санкт-Петербург, Невский пр., д. 1, кв. 10</p>
                  <Button variant="outline" className="w-full">
                    <Icon name="DoorOpen" size={20} className="mr-2" />
                    Управление домофоном
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="documents" className={activeTab === 'documents' ? '' : 'hidden'}>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-slate-800">Документы</h1>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  toast.success('Добавьте новый документ');
                }}
              >
                <Icon name="Plus" size={20} />
              </Button>
            </div>

            <Card
              className="shadow-lg border-2 border-red-100 hover-scale cursor-pointer transition-all"
              onClick={() => toast.info('Открыть паспорт РФ')}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Icon name="IdCard" size={24} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">Паспорт РФ</h3>
                    <p className="text-sm text-slate-600">Документ удостоверяющий личность</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-slate-400" />
                </div>
              </CardContent>
            </Card>

            <Card
              className="shadow-lg border-2 border-green-100 hover-scale cursor-pointer transition-all"
              onClick={() => toast.info('Открыть подорожник')}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="CreditCard" size={24} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">Подорожник</h3>
                    <p className="text-sm text-slate-600">Транспортная карта</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-slate-400" />
                </div>
              </CardContent>
            </Card>

            <Card
              className="shadow-lg border-2 border-blue-100 hover-scale cursor-pointer transition-all"
              onClick={() => toast.info('Открыть медкарту')}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="Heart" size={24} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">Медицинская карта</h3>
                    <p className="text-sm text-slate-600">Медицинские данные</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-slate-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="volunteer" className={activeTab === 'volunteer' ? '' : 'hidden'}>
          <div className="p-4 space-y-4">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Волонтёрство</h1>

            {volunteerTasks.map((task) => (
              <Card
                key={task.id}
                className="shadow-lg border-2 border-orange-100 hover-scale transition-all animate-fade-in"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800">{task.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Icon name="MapPin" size={16} />
                    <span className="text-sm">{task.district}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Icon name="Calendar" size={16} />
                    <span className="text-sm">{task.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Icon name="Users" size={16} />
                    <span className="text-sm">{task.participants} участников</span>
                  </div>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => handleVolunteerApply(task.title)}
                  >
                    Подать заявку
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profile" className={activeTab === 'profile' ? '' : 'hidden'}>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-slate-800">Профиль</h1>
              <Button size="icon" variant="outline" className="rounded-full">
                <Icon name="Pencil" size={20} />
              </Button>
            </div>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    П
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">Петр Петров</h2>
                    <p className="text-slate-600">petr@example.com</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Дата рождения</span>
                    <span className="text-slate-600">01.01.1990</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Город</span>
                    <span className="text-slate-600">Санкт-Петербург</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {hasAddress && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Умный домофон</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">Подъезд 1</p>
                      <p className="text-sm text-slate-600">Элтис • Дом.ру</p>
                    </div>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      <Icon name="DoorOpen" size={16} className="mr-2" />
                      Открыть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2 pt-4">
              <Button variant="outline" className="w-full" onClick={() => toast.info('Выход из аккаунта')}>
                <Icon name="LogOut" size={20} className="mr-2" />
                Выйти из аккаунта
              </Button>
              <Button
                variant="outline"
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => toast.error('Аккаунт удалён')}
              >
                <Icon name="Trash2" size={20} className="mr-2" />
                Удалить аккаунт
              </Button>
            </div>
          </div>
        </TabsContent>
        </Tabs>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl">
        <div className="max-w-md mx-auto flex justify-around items-center py-2">
          <Button
            variant="ghost"
            className={`flex-1 flex flex-col items-center gap-1 h-auto py-2 ${
              activeTab === 'home' ? 'text-blue-500' : 'text-slate-600'
            }`}
            onClick={() => setActiveTab('home')}
          >
            <Icon name="Home" size={24} />
            <span className="text-xs">Главное</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 flex flex-col items-center gap-1 h-auto py-2 ${
              activeTab === 'documents' ? 'text-blue-500' : 'text-slate-600'
            }`}
            onClick={() => setActiveTab('documents')}
          >
            <Icon name="FileText" size={24} />
            <span className="text-xs">Документы</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 flex flex-col items-center gap-1 h-auto py-2 ${
              activeTab === 'volunteer' ? 'text-blue-500' : 'text-slate-600'
            }`}
            onClick={() => setActiveTab('volunteer')}
          >
            <Icon name="Heart" size={24} />
            <span className="text-xs">Волонтёрство</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 flex flex-col items-center gap-1 h-auto py-2 ${
              activeTab === 'profile' ? 'text-blue-500' : 'text-slate-600'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <Icon name="User" size={24} />
            <span className="text-xs">Профиль</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Index;