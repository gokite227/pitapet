import { dbService } from "fbase";
import React, { useState } from "react";
import "resources/css/borad.css";
import { Masonry } from 'dev-portfolio';
import ImageA from "components/ImageA";

const Nweet = ({nweetObj, isOwner}) =>{
    const[editing, setEditing] = useState(false);
    const[newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
       
        if (ok) {
            await dbService.doc(`mweet/${nweetObj.id}`).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(nweetObj, newNweet);
        await dbService.doc(`mweet/${nweetObj.id}`).update({
            text: newNweet,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    };

    return(
        <Masonry id="Masonry Component" column={4} padding="0em 0em">
            {editing ? (
                <>
                    <form onSubmit = {onSubmit}>
                        <input
                            type="text"
                            placeholder="Edit your nweet"
                            value={newNweet}
                            required
                            onChange={onChange}
                        />
                        <input type ="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ):(
                <>
                        {nweetObj.attachmentUrl && (
                            <ImageA nweetObj={nweetObj} src={nweetObj.attachmentUrl} />
                        )}
                        
                    
                    {isOwner && (
                        <>
                        <img onClick={onDeleteClick} src={require(`resources/imgs/x_icon.png`)} style={{width:"30px", height:"30px"}}/>
                        
                        </>
                    )}
                </>
            )}
            
        </Masonry>
    );
};

export default Nweet;