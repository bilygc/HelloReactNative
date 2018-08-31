import React from 'react';

import {Button} from 'react-native';

const extraerUbicacion =  props => {
    return (
        <Button title="Obtener Ubicacion" onPress={props.onExtraerUbicacion}/>
        );
    };

    export default extraerUbicacion;