import ListItem from "../ListItem/ListItem";
import cl from './ListLayers.module.css'

const ListLayers = ({layers, remove, canva, deleteCanva, ...props}) => {
    return (
        <div className={cl.layer_box}>
            {layers.map((item) =>
                <ListItem
                    deleteCanva={deleteCanva}
                    canva={canva}
                    index={item.index}
                    remove={remove}
                    key={item.id}
                    item={item}
                />
            )}
        </div>
    );
};

export default ListLayers;