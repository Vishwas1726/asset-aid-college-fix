
export const priorityOrder = {
  high: 0,
  medium: 1,
  low: 2,
} as const;

export const sortRequestsByPriority = <T extends { priority: 'high' | 'medium' | 'low' }>(requests: T[]): T[] => {
  return [...requests].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};

