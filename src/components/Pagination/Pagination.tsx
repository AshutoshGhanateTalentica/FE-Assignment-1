import React from 'react'

interface Props {
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}

const Pagination: React.FC<Props> = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="pagination" role="navigation" aria-label="Pagination">
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">Prev</button>
      <span>Page {page} / {totalPages}</span>
      <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} aria-label="Next page">Next</button>
    </div>
  )
}

export default Pagination
