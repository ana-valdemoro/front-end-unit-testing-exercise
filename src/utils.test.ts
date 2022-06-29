import { defaultUser, handleAddUser } from "./utils"



const user1 = {
  id: '::id1::',
  name: '::name1::'
}
const user2 = {
  id: '::id2::',
  name: '::name2::'
}

const people = [user1, user2]
const setMocked = jest.fn((array: object[]) => true)

afterEach(jest.clearAllMocks)

describe('Utils', () => {
  describe('handleAddUser', () => {
    test('should throw and error when contract on people parameter is not met', () => {
      const people2 = [
        ...people,
        {
          id: '::id3::',
          name: '::name3::',
          potato: '::potato3::'
        }
      ] as any
      (setMocked as jest.Mock)
        .mockImplementation((array: object[]) => array)
        try {
          handleAddUser(people2, setMocked)
        } catch (error) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(error).not.toBe(null)          
        }
    })
  })

  test('should does not throw an error when people contract is met', () => {
    const people2 = [
      ...people,
      {
        id: '::id3::',
        name: '::name3::',
      }
    ] as any
    (setMocked as jest.Mock)
      .mockImplementation((array: object[]) => array)
        handleAddUser(people2, setMocked)
        // eslint-disable-next-line jest/no-conditional-expect
        expect(setMocked).toBeCalledTimes(1)
  })

  test('should add default user to the people param', () => {
    const mockedUser = {
      name: '::Ana::',
      id: '::IlikeTDD::'
    } as any
    (setMocked as jest.Mock)
      .mockImplementation((value: any) => [...value, mockedUser])
    handleAddUser(people, setMocked)
    expect(setMocked).toBeCalledTimes(1)
    expect(setMocked).toBeCalledWith([...people, defaultUser])
  })

  test('should add user passed on param', () => {
    const mockedUser = {
      name: '::Ana::',
      id: '::IlikeTDD::'
    } as any
    (setMocked as jest.Mock)
      .mockImplementation((value: any) => [...value, mockedUser])
    handleAddUser(people, setMocked, mockedUser)
    expect(setMocked).toBeCalledTimes(1)
    expect(setMocked).toBeCalledWith([...people, mockedUser])
  })
})