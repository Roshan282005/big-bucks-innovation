import { useQuery } from '../lib/tanstack-query.min.js'
import { faker } from '@faker-js/faker'

// Mock API function - replace with actual postgres/sqlite calls
const fetchUsers = async () => {
  // TODO: Replace with real API call
  // import { getUsers } from '../lib/postgres' or '../lib/sqlite'
  // return getUsers()
  
  // Mock data for now
  await new Promise(resolve => setTimeout(resolve, 1000))
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['Admin', 'User', 'Manager']),
    createdAt: faker.date.past()
  }))
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// TypeScript declarations for custom TanStack Query bundle
declare module '../lib/tanstack-query.min.js' {
  function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends Array<unknown> = Array<unknown>>(
    options: {
      queryKey: TQueryKey
      queryFn: () => TQueryFnData | Promise<TQueryFnData>
      staleTime?: number
    }
  ): {
    data: TData | undefined
    error: TError | null
    isLoading: boolean
    isError: boolean
    refetch: () => void
  }
}
