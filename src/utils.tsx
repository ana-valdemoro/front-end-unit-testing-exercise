

export const handleAddUser = (people: object[], setPeople: any): void => {
    setPeople([...people!, { id: '22', name: 'Ana Valdemoro' }])
};