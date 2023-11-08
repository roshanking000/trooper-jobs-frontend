import React, { useState } from 'react';
import { render } from 'react-dom';
import { SPECIALITIES } from './specialities';
import { GAMES } from './games';
import './style.css';
import { WithContext as ReactTags } from '../ReactTags';
import removeIcon from '/icons/x_gray.svg'
import { isInvalid } from '../../utils';
import { UserType } from '../../Global';
let suggestions = null
const KeyCodes = {
  comma: 188,
  enter: 13,
  tab: 9,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.tab];

const SpecialityTagInput = (props) => {
  let {tags, setTags, type, presets, offsetinput, setCurPreset, userType} = props;

  if (type == "speciality") {
    suggestions = SPECIALITIES[isInvalid(userType) ? UserType.Gamer : userType ].map((speciality) => {
      return {
        // id: speciality.toLowerCase().replace(' ', '_'),
        id: speciality,
        text: speciality,
        is_preset: false,
      };
    });
  }
  else if (type == "game") {
    suggestions = GAMES.map((speciality) => {
      return {
        // id: speciality.toLowerCase().replace(' ', '_'),
        id: speciality,
        text: speciality,
        is_preset: false,
      };
    });
  }

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    // console.log('The tag at index ' + index + ' was clicked');
  };

  return (
    <div className='w-full grow flex overflow-auto'>
      <ReactTags
          tags={tags}
          id="speciality-tags"
          name="speciality-tags"
          suggestions={suggestions}
          delimiters={delimiters}
          placeholder='Write and press enter'
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          allowDeleteFromEmptyInput={false}
          inputFieldPosition="top"
          autofocus={false}
          // autocomplete
          removeIcon={removeIcon}
          presets={presets}
          offsetinput={offsetinput}
          setCurPreset={setCurPreset}
        />
    </div>
  )
}

export default SpecialityTagInput;