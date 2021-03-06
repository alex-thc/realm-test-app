import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import generateTableIcons from 'components/common/helpers/TableIcons';
import { ProjectContext } from 'context/ProjectContext';

export default function SimpleETable(props) {
    const {
        projectId, tableName,
        currentColumns, currentData,
        onUpdate,
    } = props;

    const { isEditing, setIsEditing } = useContext(ProjectContext);

    const [columns, setColumns] = useState(currentColumns);
    const [data, setData] = useState(currentData);

    useEffect(() => {
        !isEditing && setColumns(currentColumns);
    }, [isEditing, projectId, currentColumns]);

    useEffect(() => {
        !isEditing && setData(currentData);
    }, [isEditing, projectId, currentData]);

    const onClickEditButton = () => setIsEditing(true);

    return (
        <MaterialTable
            title={tableName}
            icons={generateTableIcons({ onClickEditButton })}
            columns={columns}
            data={data}
            options={{
                search: false,
                sorting: false,
                paging: false,
                padding: 'dense',
            }}
            editable={{
                isEditable: (rowData) => rowData.editable,
                onRowUpdate: async (newData, oldData) => {
                    try {
                        const { tableKey, updateKey } = newData;
                        await onUpdate({ updateKey, value: newData[tableKey] });
                        const dataUpdate = [...data];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        setData([...dataUpdate]);
                        setIsEditing(false);
                    } catch (e) {
                        console.error(e);
                        setIsEditing(false);
                    }
                },
                onRowUpdateCancelled: () => setIsEditing(false),
            }}
        />
    );
}

SimpleETable.propTypes = {
    projectId: PropTypes.string.isRequired,
    tableName: PropTypes.string.isRequired,
    currentColumns: PropTypes.array.isRequired,
    currentData: PropTypes.array.isRequired,
    onUpdate: PropTypes.func,
};

SimpleETable.defaultProps = {
    onUpdate: () => console.log('onUpdate'),
};
