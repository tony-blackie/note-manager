import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import NotePanel from '../NotePanel';

describe('NotePanel', () => {
    describe('#render', () => {
        it('should generate note elements', () => {
            let mockProps = {
                notes: [
                    {
                        id: 5,
                        name: 'Funny note',
                        text: 'It is litteraly a joke',
                        parent_id: 3
                    },
                    {
                        id: 7,
                        name: 'Hillarious note',
                        text: 'Funny text here',
                        parent_id: 3
                    }
                ],
                activeFolderId: 3
            };

            let component = shallow(<NotePanel {...mockProps} />);

            expect(component.find('Note').length).toEqual(2);
        });

        it('should not generate note elements if folderIsNotActive', () => {
          let mockProps = {
              notes: [
                  {
                      id: 5,
                      name: 'Funny note',
                      text: 'It is litteraly a joke',
                      parent_id: 3
                  },
                  {
                      id: 7,
                      name: 'Hillarious note',
                      text: 'Funny text here',
                      parent_id: 3
                  }
              ],
              activeFolderId: 2
          };

          let component = shallow(<NotePanel {...mockProps} />);

          expect(component.find('Note').length).toEqual(0);
        });
    });
});
