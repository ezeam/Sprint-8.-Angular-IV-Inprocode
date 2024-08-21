import { Request, Response } from 'express';

export const getClientes = (req: Request, res: Response)=> {
  res.json({ 
    msg: 'get Clientes' 
  });
}

export const getCliente = (req: Request, res: Response)=> {  
  const { id } = req.params;

  res.json({ 
    msg: 'get Cliente',
    id
  });  
}

export const deleteCliente = (req: Request, res: Response)=> {  
  const { id } = req.params;

  res.json({ 
    msg: 'delete Cliente',
    id
  });  
}

export const postCliente = (req: Request, res: Response)=> {  
  const { body } = req;
  
  res.json({ 
    msg: 'post Cliente',
    body
  });  
}

export const updateCliente = (req: Request, res: Response)=> {  
  const { body } = req;
  const { id } = req.params;
  res.json({ 
    msg: 'update Cliente',
    id,
    body
  });  
}