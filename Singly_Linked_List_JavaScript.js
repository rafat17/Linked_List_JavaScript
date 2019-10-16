//This is the code for a singly linked list

//All of these operations are only valid for this form of linked list

//the Node class has been created below
var Node = function(data, next){
  this.data = data || null
  this.next = next || null
}

//The LinkedList class has been created below
var LinkedList = function(){
  this.head = this.tail = null
}


//returns the total number of nodes on a list 
LinkedList.prototype.count = function(){
  var count = 0
  if(!this.head){
    return count
  }
  else{
    currentNode = this.head
    count++
    while(currentNode.next !== null){
      count++
      currentNode = currentNode.next
  }
}
  
  return count 
}


/******** ALL INSERTION OPERATIONS ********/

//adds the node to the last position of the list
LinkedList.prototype.append = function(data){
  
  //if there are no nodes
  if(!this.tail){
    this.tail = this.head = new Node(data)
  }
  else{
    var oldTail = this.tail
    this.tail = new Node(data)
    oldTail.next = this.tail
  }
}


//adds the node to the beginning of the list
LinkedList.prototype.prepend = function(data){
  
  //if there are no nodes
  if(!this.head){
    this.head = this.tail = new Node(data)
  }
  else{
    var oldHead = this.head
    this.head = new Node(data)
    this.head.next = oldHead
  }
}


//prepends at a certain index position
LinkedList.prototype.insertAtIndex = function(data, index){

  if(index > this.count - 1){
    return null
  }

  if(!this.head){
    if(index === 0){
      this.head = this.tail = new Node(data)
    }
  }

  var count = 0
  var currentNode = this.head
  previousNode = null

  while(currentNode.next !== null){
    previousNode = currentNode
    count++
    currentNode = currentNode.next
    
    if(count === index){
      var newNode = new Node(data)
      previousNode.next = newNode
      newNode.next = currentNode
      break  
    }
  }
}



/**********ALL DELETION OPERATIONS **********/

//Removes the head 
LinkedList.prototype.deleteHead = function(){
  
  if(!this.head){
    return null
  }
  else{
    var oldHead = this.head
    this.head = this.head.next
    return oldHead
  }
}


//Removes the tail
LinkedList.prototype.deleteTail = function(){
  
  if(!this.tail){
    return null
  }

  else{
    currentNode = this.head

    while(currentNode.next !== this.tail){
      currentNode = currentNode.next
    }

    var oldTail = this.tail
    this.tail = currentNode
    this.tail.next  = null

    return oldTail
  }
}


//Removes the node at a given value
LinkedList.prototype.deleteAtValue = function(data){
  
  if(!this.head){
    return null
  }

  else{
    var currentNode = this.head
    var removedNode = null

    //removes the node if found at head position
    if(currentNode.data === data){
      removedNode = currentNode 
      this.head = currentNode.next
      return removedNode
    }

    while(currentNode.next != null){
      previousNode = currentNode
      currentNode = currentNode.next
      if(currentNode.data === data){
        break
      }
    }


    //removes the node if present at the tail
    if(currentNode.next == null){
      if(currentNode.data === data){
        removedNode = currentNode
        return removedNode
      }
      else{
        return removedNode
      }
    }
    
    //removed the node if present between the head and the tail
    removedNode = currentNode
    previousNode.next = removedNode.next
    return removedNode
     
  }

}


//removes the node at a given index position
LinkedList.prototype.deleteAtIndex = function(index){
 
  if(this.count() === 0){
    return null
  }

  if(index > this.count() - 1){
    return null 
  }

  var count = 0
  currentNode = this.head

  if(index == count){
    oldNode = this.head
    this.head = this.head.next
    return oldNode
  }

  var previousNode = null 
  var removedNode = null

  while(currentNode.next !== null){
    previousNode = currentNode
    currentNode = currentNode.next
    count++
    if(count === index){
      break
    }
  }

  if(currentNode.next === null){
    previousNode.next = null
    this.tail = previousNode
    removedNode = currentNode
    return removedNode
  }

  console.log(previousNode)
  console.log(currentNode)

  
  removedNode = currentNode
  previousNode.next = removedNode.next
  return removedNode

}



/************* ALL SEARCHING OPERATIONS *************/

//Searches an element in the list
LinkedList.prototype.searchAtValue = function(data){
  
  //if there are no nodes
  if(!this.head){
    return null
  }

  else{
    var currentNode = this.head

    //checks if the data is present in the head
    if(currentNode.data === data){
      return currentNode
    }

    //Checks if the data is present in any other nodes up to tail node
    while(currentNode.next !== null){
     
      currentNode = currentNode.next

      if(currentNode.data === data){
        return currentNode
      }
    }

    return null

  }
}


//searches for the element at the given index
LinkedList.prototype.searchAtIndex = function(index){

  if(this.count() === 0){
    return null
  }

  if(index > this.count() - 1){
    return null 
  }

  //checks if one node is present on the list only
  if(this.count() === 1){
    return this.head
  }

  var count = 0

  //checks if the node is present at the head position
  if(count === index){
    return this.head
  }

  var currentNode = this.head
 
  
  //checks if the index is present any other place on the list
  while(currentNode.next !== null){
    count++
    currentNode = currentNode.next

    if(count === index){
      break
    }
  }

  return currentNode

}


//deletes the head
LinkedList.prototype.deleteHead = function(){
  
  if(!this.head){
    return null
  }
  else{
    var oldHead = this.head
    this.head  = this.head.next
    return oldHead
  }
}


/************* DISPLAYING A LINKED LIST *******/
LinkedList.prototype.displayList = function(){
  if(!this.head){
    return null
  }

  var currentNode = this.head

  var str = ''

  while(currentNode.next !== null){
    str = str + currentNode.data + '--->'
    currentNode = currentNode.next
  }

  str = str + currentNode.data
  return str 
}



/***** A FEW ADVANCED OPERATIONS IN SINGLY LINKED LIST **********/


//reverses the whole linked list 
LinkedList.prototype.reverse =  function(){
  var previousNode = null
  var currentNode = this.head 
  var nextNode = null


  //checks if any nodes are present in the list
  if(!currentNode){
    return null
  }

  //initializes the head and tail to be the same
  //in case of 1 node present on the list only
  else if(this.count() === 1){
    this.tail = currentNode
  }

  //reverses the whole list for at least 2 nodes present on the list
  else{
    while(currentNode !== null){
      nextNode = currentNode.next
      currentNode.next = previousNode
      previousNode = currentNode
      currentNode = nextNode 
    }

    this.head = previousNode

  }
}



//reverses the linkedlist between the specified index range
//m indicates starting index
//n indicates ending index
LinkedList.prototype.reverseBetween = function(m, n){

  if(this.head === null){
    return head
  }

  var total = 1
  var currentNode = head

  while(currentNode.next !== null){
    total++
    currentNode = currentNode.next
  }


  if(m > total || m < 1 || n > total || n < 1){
    return null
  }

  else if((m > n) || (m === n)){
    return null
  }

  else{
    var count = 1
    currentNode = this.head
    var startNode = endNode = null
    
    while(currentNode !== null){
      if(count === m){
      startNode = currentNode
      } 
     
     if(count === n){
      endNode = currentNode
      }

    count++
    currentNode = currentNode.next
  }

  var tempNode = startNode.data
  startNode.data = endNode.data 
  endNode.data = tempNode

  
  return reverseBetween(m+1, n-1)
}

}


//swaps the linkedlist in pairs
LinkedList.prototype.swapPairs = function(){

  if(this.head === null){ return null }

  else if(this.head.next === null){ return null }

  else{
    var currentNode = this.head
    var nextNode = null
    var tempNode = null

    while(currentNode.next !== null){
      nextNode = currentNode.next
      
      tempNode = nextNode.data 
      nextNode.data = currentNode.data 
      currentNode.data = tempNode

      if(currentNode.next.next !== null){
        currentNode = currentNode.next.next
      }
        
      else{
        currentNode = currentNode.next
      }
    }

  }
}



//shifts the tail node to the head position
LinkedList.prototype.shiftTailtoHeadPosition = function(){
  var newHead = null
  var currentNode = this.head

  while(currentNode.next !== this.tail){
    currentNode = currentNode.next 
  }

  newHead = this.tail
  newHead.next = this.head
  this.tail = currentNode
  this.tail.next = null
  this.head = newHead

}

//Calling and testing the methods created in the linked list class

l1 = new LinkedList()
l1.append(10)
l1.append(20)
l1.append(30)
l1.append(40)
// l1.append(50)
//l1.prepend(50)
// l1.prepend(100)


console.log(l1.displayList())
console.log(l1.shiftTailtoHeadPosition())
console.log(l1.displayList())
console.log(l1.shiftTailtoHeadPosition())
console.log(l1.displayList())





