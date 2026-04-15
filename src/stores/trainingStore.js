import { defineStore } from 'pinia'
import coursesSeed from '@/data/courses.json'
import { cloneData, loadState, saveState } from '@/utils/storage'

const STORAGE_KEY = 'redalimenta-training'

export const useTrainingStore = defineStore('trainingStore', {
  state: () => ({
    courses: cloneData(coursesSeed),
    enrollments: loadState(STORAGE_KEY, [])
  }),
  getters: {
    enrolledCourseIds: (state) => state.enrollments.map((item) => item.courseId),
    enrollmentCount: (state) => state.enrollments.length
  },
  actions: {
    persistEnrollments() {
      saveState(STORAGE_KEY, this.enrollments)
    },
    isEnrolled(courseId) {
      return this.enrollments.some((item) => item.courseId === courseId)
    },
    enroll(courseId) {
      if (this.isEnrolled(courseId)) {
        return false
      }

      const course = this.courses.find((item) => item.id === courseId)
      if (!course) {
        return false
      }

      this.enrollments = [
        {
          courseId,
          enrolledAt: new Date().toISOString()
        },
        ...this.enrollments
      ]
      this.persistEnrollments()
      return true
    }
  }
})
