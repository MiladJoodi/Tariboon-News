'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Article, Author, Category, Comment, Tag } from '@/types'
import { articles as initialArticles } from '@/data/articles'
import { authors as initialAuthors } from '@/data/authors'
import { categories as initialCategories } from '@/data/categories'
import { tags as initialTags } from '@/data/tags'
import { comments as initialComments } from '@/data/comments'

interface AdminStore {
  articles: Article[]
  authors: Author[]
  categories: Category[]
  tags: Tag[]
  comments: Comment[]
  resetToSeed: () => void

  addArticle: (article: Article) => void
  updateArticle: (id: string, updates: Partial<Article>) => void
  deleteArticle: (id: string) => void
  deleteArticles: (ids: string[]) => void

  approveComment: (id: string) => void
  rejectComment: (id: string) => void
  deleteComment: (id: string) => void

  addCategory: (category: Category) => void
  updateCategory: (id: string, updates: Partial<Category>) => void
  deleteCategory: (id: string) => void

  addTag: (tag: Tag) => void
  deleteTag: (id: string) => void

  updateAuthor: (id: string, updates: Partial<Author>) => void
}

const seed = {
  articles: initialArticles,
  authors: initialAuthors,
  categories: initialCategories,
  tags: initialTags,
  comments: initialComments,
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      ...seed,

      resetToSeed: () => set({ ...seed }),

      addArticle: (article) =>
        set((state) => ({ articles: [article, ...state.articles] })),

      updateArticle: (id, updates) =>
        set((state) => ({
          articles: state.articles.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        })),

      deleteArticle: (id) =>
        set((state) => ({ articles: state.articles.filter((a) => a.id !== id) })),

      deleteArticles: (ids) =>
        set((state) => ({ articles: state.articles.filter((a) => !ids.includes(a.id)) })),

      approveComment: (id) =>
        set((state) => ({
          comments: state.comments.map((c) => (c.id === id ? { ...c, approved: true } : c)),
        })),

      rejectComment: (id) =>
        set((state) => ({
          comments: state.comments.map((c) => (c.id === id ? { ...c, approved: false } : c)),
        })),

      deleteComment: (id) =>
        set((state) => ({ comments: state.comments.filter((c) => c.id !== id) })),

      addCategory: (category) =>
        set((state) => ({ categories: [...state.categories, category] })),

      updateCategory: (id, updates) =>
        set((state) => ({
          categories: state.categories.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),

      deleteCategory: (id) =>
        set((state) => ({ categories: state.categories.filter((c) => c.id !== id) })),

      addTag: (tag) =>
        set((state) => ({ tags: [...state.tags, tag] })),

      deleteTag: (id) =>
        set((state) => ({ tags: state.tags.filter((t) => t.id !== id) })),

      updateAuthor: (id, updates) =>
        set((state) => ({
          authors: state.authors.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        })),
    }),
    { name: 'tariboon-admin' }
  )
)
