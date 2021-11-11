import React from 'react';
import { deletePerson, modifyPerson } from './apicall';


/** React Component for Single Entry Card for a Person in the database
 * 
 * @param {Object} listItem Object storing a person's information
 * @param {Boolean} detailed Display details? 
 * @returns 
 */
function Entry({ listItem, detailed, people, setPeople, details, setDetails }) {
    // If the data hasn't loaded yet, then dont output anything
    if (!listItem) {
        return (<div></div>);
    }

    const deleteEntry = e => {
        let id = listItem.people_id;
        let copy = [...details];
        const ind = copy.indexOf(listItem);
        copy.splice(ind, 1);
        setDetails(copy);

        async function deleteAPerson() {
            await deletePerson(id);
        }
        
        deleteAPerson();
    }


    const increment = e => {
        let id = listItem.people_id;
        let copy = [...details];
        const ind = copy.indexOf(listItem);
        copy[ind].age++;
        setPeople(copy);

        async function birthday() {
            await modifyPerson(id, copy[ind].age);
        }

        birthday();
    }

    // If not detailed. only render name, age, gender, and email
    if (!detailed) {
        return (
            <div class="entry-card">
                <h3>{listItem.first_name} &nbsp; {listItem.last_name}</h3>
                <div class="row">
                    <div class="col-8">Age</div>
                    <div class="col-4">{listItem.age}</div>
                </div>
                <div class="row">
                    <div class="col-8">Gender</div>
                    <div class="col-4">{listItem.gender}</div>
                </div>
                <div class="row">
                    <div class="col-8">Email</div>
                    <div class="col-4">{listItem.email}</div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <input class="basic" type="button" value="Delete this entry" onClick={deleteEntry}/>
                    </div>
                    <div class="col-sm">
                        <input class="basic" type="button" value={"It's " + listItem.first_name + "'s Birthday"} onClick={increment}/>
                    </div>
                </div>
            </div>
        );
    }

    // Otherwise, render COVID status and location as well
    return (
        <div class="entry-card">
            <h3>{listItem.first_name} &nbsp; {listItem.last_name}</h3>
            <div class="row">
                <div class="col-8">Age</div>
                <div class="col-4">{listItem.age}</div>
            </div>
            <div class="row">
                <div class="col-8">Gender</div>
                <div class="col-4">{listItem.gender}</div>
            </div>
            <div class="row">
                <div class="col-8">Email</div>
                <div class="col-4">{listItem.email}</div>
            </div>
            <div class="row">
                <div class="col-8">Has COVID?</div>
                <div class="col-4">{listItem.has_covid ? "Yes" : "No"}</div>
            </div>
            <div class="row">
                <div class="col-8">Location</div>
                <div class="col-4">{listItem.city},&nbsp;{listItem.state_province},&nbsp;{listItem.country}</div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <input class="basic" type="button" value="Delete this entry" onClick={deleteEntry}/>
                </div>
                <div class="col-sm">
                    <input class="basic" type="button" value={"It's " + listItem.first_name + "'s Birthday"} onClick={increment}/>
                </div>
            </div>
        </div>
    );
}

// Export the component so that it can be used by the main app
export default Entry;