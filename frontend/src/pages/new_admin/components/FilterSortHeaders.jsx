import React from 'react'

// chakra ui icons
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

export default function FilterSortHeaders( { header, onSort, clickedArrowId, setClickedArrowId }) {
  return (
    <div key={header.id}>
    <div>{header.name}</div>
    <div className="sort-icons-container-headers">
      <ChevronUpIcon
        onClick={() => {
          setClickedArrowId(`${header.id}-up`);
          onSort(header.field, "asc");
        }}
      color={clickedArrowId === `${header.id}-up` ? "#36454F" : "#ccc"}
      cursor="pointer"
      _hover={{
        color: "#2C2C2C",
      }}
      />
      <ChevronDownIcon
        onClick={() => {
          setClickedArrowId(`${header.id}-down`);
          onSort(header.field, "desc");
        }}
      color={clickedArrowId === `${header.id}-down` ? "#36454F" : "#ccc"}
      cursor="pointer"
      _hover={{
        color: "#2C2C2C",
      }}
      />
    </div>
    </div>
  )
}
