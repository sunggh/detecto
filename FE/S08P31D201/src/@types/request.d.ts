

// User 타입 선언
declare module "AxiosRequest" {
	export type useAxiosParmas = {
    isFire: boolean,
    requestObj: {
      url: string,
      method: 'get' | 'post' | 'put' | 'delete' | 'patch',
      body?: object
    },
    tryHandler: () => void,
    catchHandler: () => void,
    finallyHandler: () => void
  }
}