# Evaluation Criteria & Deliverables

## Scoring Breakdown (Total: 100 points)

### Phase 1: Routing Fixes (20 points)
- [ ] Course details page correctly filters lessons by courseId (10 pts)
- [ ] Lesson navigation works from course details (5 pts)
- [ ] Proper error handling for invalid IDs (5 pts)

### Phase 2: API Integration (30 points)
- [ ] Axios/fetch properly configured with base URL and auth (5 pts)
- [ ] API service functions created for all endpoints (10 pts)
- [ ] Components use API calls instead of dummy data (10 pts)
- [ ] Loading states and error handling implemented (5 pts)

### Phase 3: Redux Implementation (35 points)
- [ ] Redux Toolkit properly installed and configured (5 pts)
- [ ] Course slice with async thunks and caching (10 pts)
- [ ] Lesson slice with async thunks and caching (10 pts)
- [ ] User progress slice with localStorage persistence (10 pts)

### Phase 4: Bonus Features (10 points)
- [ ] Course content caching implemented (3 pts)
- [ ] Optimistic updates for lesson completion (3 pts)
- [ ] Progress indicators or additional UX improvements (4 pts)

### Code Quality & Best Practices (5 points)
- [ ] TypeScript used throughout with proper typing (2 pts)
- [ ] Clean, readable code structure (2 pts)
- [ ] No console errors or TypeScript errors (1 pt)

## Deliverables Checklist

### Required Files
- [ ] All source code changes committed to git
- [ ] `README.md` with implementation notes and decisions
- [ ] Working application that meets all Phase 1-3 requirements

### Implementation Notes (in README)
- [ ] Brief explanation of Redux store structure
- [ ] Description of API integration approach
- [ ] Any challenges faced and solutions implemented
- [ ] Performance optimizations added

## Testing Requirements

### Functional Testing
- [ ] All courses load from API and display correctly
- [ ] Course details page shows correct lessons
- [ ] Lesson pages load and display markdown content
- [ ] Lesson completion state persists on page reload
- [ ] Dark mode still works correctly
- [ ] Responsive design maintained on mobile

### Edge Cases
- [ ] Invalid course/lesson IDs handled gracefully
- [ ] Network errors display appropriate messages
- [ ] Loading states prevent UI flickering
- [ ] API rate limiting handled appropriately

## Interview Discussion Points

### Technical Questions
1. How did you structure your Redux store?
2. What caching strategy did you implement?
3. How do you handle API errors and loading states?
4. What TypeScript patterns did you use?

### Architecture Questions
1. How would you scale this for more complex state management?
2. What would you change for a production deployment?
3. How would you add real-time features (like progress sync)?

## Time Management Assessment
- **Phase 1**: Should take ~30 minutes
- **Phase 2**: Should take ~90 minutes
- **Phase 3**: Should take ~90 minutes
- **Phase 4**: Should take ~30 minutes

Candidates who complete all phases within 4 hours demonstrate good time management and coding efficiency.

## Common Pitfalls to Watch For
- Not properly typing API responses
- Missing error boundaries
- Not handling loading states
- Redux store not properly normalized
- Not persisting state correctly
- Breaking existing functionality (dark mode, routing)
- Not testing edge cases

## Success Indicators
- Clean git history with meaningful commit messages
- Well-structured components with separation of concerns
- Proper error handling and user feedback
- Maintainable and scalable code architecture
- Working application that meets all requirements