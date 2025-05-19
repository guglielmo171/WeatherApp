

Ecco come integrare TanStack Query in un'architettura ibrida service/hooks, organizzata per scalare in contesti enterprise:

### 🏗️ Architettura Stratificata

```
src/
├── services/           # Business logic pura
│   └── WeatherService.ts
├── hooks/              # Integrazione con React
│   └── useWeather.ts
├── api-client/         # Configurazione HTTP
│   └── ApiClient.ts
└── providers/          # Context providers
    └── ApiProvider.tsx
```

### 1. **Service Layer (Business Logic)**
```typescript
// services/WeatherService.ts
import ApiClient from '../api-client/ApiClient';

export class WeatherService {
  constructor(private apiClient: ApiClient) {}

  async searchCities(query: string): Promise<CitySearchResult[]> {
    const response = await this.apiClient.get('/search.json', { q: query });
    return this.normalizeCityData(response);
  }

  private normalizeCityData(rawData: any): CitySearchResult[] {
    // Business logic per trasformazione dati
    return rawData.map(city => ({
      id: city.id,
      name: city.name,
      region: city.region
    }));
  }
}
```

### 2. **API Client (Astrazione HTTP)**
```typescript
// api-client/ApiClient.ts
export default class ApiClient {
  constructor(private baseUrl: string, private apiKey: string) {}

  async get(endpoint: string, params: Record<string, string>) {
    const query = new URLSearchParams({ ...params, key: this.apiKey });
    const response = await fetch(`${this.baseUrl}${endpoint}?${query}`);
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }
}
```

### 3. **Custom Hook (React Integration)**
```typescript
// hooks/useWeather.ts
import { useQuery } from '@tanstack/react-query';
import { WeatherService } from '../services/WeatherService';
import { useApiContext } from '../providers/ApiProvider';

export const useWeather = () => {
  const { weatherService } = useApiContext();

  const citySearch = (query: string) => useQuery({
    queryKey: ['citySearch', query],
    queryFn: () => weatherService.searchCities(query),
    enabled: query.length > 2,
    staleTime: 10 * 60 * 1000
  });

  return { citySearch };
};
```

### 4. **Context Provider (Dependency Injection)**
```typescript
// providers/ApiProvider.tsx
import ApiClient from '../api-client/ApiClient';
import { WeatherService } from '../services/WeatherService';

const apiClient = new ApiClient(
  'https://api.weatherapi.com/v1',
  import.meta.env.VITE_API_KEY
);

const ApiContext = createContext({
  weatherService: new WeatherService(apiClient)
});

export const ApiProvider = ({ children }: { children: ReactNode }) => (
  <ApiContext.Provider value={{ weatherService: new WeatherService(apiClient) }}>
    {children}
  </ApiContext.Provider>
);

export const useApiContext = () => useContext(ApiContext);
```

### 5. **Component Integration**
```typescript
// components/SearchCity.tsx
const SearchCity = () => {
  const [query, setQuery] = useState('');
  const { citySearch } = useWeather();
  const { data, isPending, error } = citySearch(query);

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
      />
      
      {isPending && <Spinner />}
      
      {data?.map(city => (
        <CityResult key={city.id} city={city} />
      ))}
    </div>
  );
};
```

### ✅ **Vantaggi Chiave**
1. **Separation of Concerns**:
    - Business logic isolata nei services
    - UI logic gestita dagli hooks
    - Configurazione HTTP centralizzata

2. **Testabilità**:
   ```typescript
   // Test del service senza React
   test('normalizeCityData trasforma correttamente i dati', () => {
     const service = new WeatherService(mockApiClient);
     const result = service.normalizeCityData(mockRawData);
     expect(result).toMatchSnapshot();
   });
   ```

3. **Type Safety**:
    - Tipi condivisi tra services e hooks
    - Validazione runtime opzionale con Zod

4. **Scalabilità**:
    - Aggiunta nuovi endpoint senza modificare gli hooks
    - Sostituzione facile del client HTTP

5. **Cache Management**:
    - Controllo granulare delle query
    - Invalidazione incrociata tra servizi correlati

### 🔄 Flusso Dati
```
Component → Hook → Service → API Client → HTTP Request
           ↑          ↓
        React Query  Business Logic
```

### 🛠️ Estensioni Consigliate
1. **Error Handling Stratificato**:
   ```typescript
   class WeatherService {
     async searchCities(query: string) {
       try {
         return await this.apiClient.get(...);
       } catch (error) {
         throw new WeatherServiceError('City search failed', error);
       }
     }
   }
   ```

2. **Cache Invalidation**:
   ```typescript
   // Dopo un'azione di successo
   queryClient.invalidateQueries({ queryKey: ['weather'] });
   ```

3. **Request Cancellation**:
   ```typescript
   this.apiClient.get('/endpoint', { signal: abortController.signal });
   ```

Questa architettura bilancia flessibilità e struttura, mantenendo il codice:
- **Manutenibile**: Modifiche localizzate
- **Testabile**: Componenti isolati
- **Scalabile**: Nuove feature integrate coerentemente
- **Performance**: Ottimizzazione cache centralizzata

--- 
- [ ] Task1 : Architettura modulare e Stratificata con approccio Enterprise-Like
- [ ] Task 2 : Implementare axios
- [ ] Task 3 Strutturare Readme.md come spiegazione e documentazione per chi visita la repository.