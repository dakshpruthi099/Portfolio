export const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      
      // Update URL without scroll
      window.history.pushState(null, '', targetId)
    }
  }