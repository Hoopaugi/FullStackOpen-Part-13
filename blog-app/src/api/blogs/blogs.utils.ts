import { isString, isNumber } from "../../utils"
import { IBlogCreationAttributes } from "./blogs.types"

export const toNewBlog = (object: unknown): IBlogCreationAttributes => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if(!('authorizedUser' in object && typeof object.authorizedUser === 'object')) {
    throw new Error('Incorrect or missing authorizedUser');
  }

  if(!(object.authorizedUser && 'id' in object.authorizedUser && typeof object.authorizedUser.id === 'number')) {
    throw new Error('Incorrect or missing authorizedUser');
  }

  if ('title' in object && 'url' in object && 'authorizedUser' in object) {
    const newBlog: IBlogCreationAttributes = {
      title: parseTitle(object.title),
      url: parseUrl(object.url),
      author: 'author' in object ? parseAuthor(object.author) : undefined,
      likes: 'likes' in object ? parseLikes(object.likes) : 0,
      // FIXME: Type coercion
      userId: object.authorizedUser.id
    }

    return newBlog
  }

  throw new Error('Invalid or missing fields')
}

const parseAuthor = (author: unknown): string => {
  if (!isString(author)) {
    throw new Error('Invalid author')
  }

  return author
}

const parseUrl = (url: unknown): string => {
  if (!url || !isString(url)) {
    throw new Error('Invalid or missing url')
  }

  return url
}

const parseTitle = (title: unknown): string => {
  if (!title || !isString(title)) {
    throw new Error('Invalid or missing title')
  }

  return title
}

export const parseLikes = (likes: unknown): number => {
  if (!isNumber(likes)) {
    throw new Error('Invalid likes')
  }

  return likes
}
