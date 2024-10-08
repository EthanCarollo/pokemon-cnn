import tf from '@tensorflow/tfjs-node-gpu'

export function disableWarning(){
    process.env.TF_CPP_MIN_LOG_LEVEL = '3';
}

export function log(model){
    console.log(model)
}

export function getSequentialModel(){
    return tf.sequential();
}

export function addLayerToModel(model, layer){
    model.add(layer)
    return model
}

/**
 * @param {Array} inputShape 
 * @param {Int16Array} filters 
 * @param {Int16Array} kernelSize 
 * @param {string} activation 
 * @returns 
 */
export function getConvolution2DLayer(inputShape, filters, kernelSize, activation){
    return tf.layers.conv2d({
        inputShape: inputShape,
        filters: filters,
        kernelSize: kernelSize,
        activation: activation
    })
}

/**
 * @param {Int16Array} filters 
 * @param {Int16Array} kernelSize 
 * @param {string} activation 
 * @returns 
 */
export function getConvolution2DLayerNoInput(filters, kernelSize, activation){
    return tf.layers.conv2d({
        filters: filters,
        kernelSize: kernelSize,
        activation: activation
    })
}

export function getConvolution2DLayerPadding(filters, kernelSize, padding, activation){
    return tf.layers.conv2d({
        filters: filters,
        kernelSize: kernelSize,
        padding: padding,
        activation: activation
    })
}

/**
 * @param {Array} poolSize array like [x, x] 
 * @returns 
 */
export function getMaxPooling2D(poolSize){
    return tf.layers.maxPooling2d({poolSize: poolSize})
}

export function getFlatten(){
    return tf.layers.flatten()
}

export function getBatchNormalization(){
    return tf.layers.batchNormalization()
}

/**
 * @param {Float32Array} rate 
 * @returns 
 */
export function getDropOut(rate){
    return tf.layers.dropout({rate: rate})
}

/**
 * @param {Int16Array} units 
 * @param {String} activation 
 * @returns 
 */
export function getDense(units, activation){
    return tf.layers.dense({units: units, activation: activation})
}

export function modelCompile(model, optimizer, loss, metrics, learningRate){
    model.compile({
        optimizer: optimizer,
        learningRate: learningRate,
        loss: loss,
        metrics: metrics
    });
    return model
}

export function modelSummary(model){
    model.summary()
    return model
}

export async function modelFit(model, trainData, batchSize, validationSplit, epochs){
    const history = await model.fit(trainData.xs, trainData.ys, {
        batchSize: batchSize,
        epochs: epochs,
        validationSplit: validationSplit,
        shuffle: true
      });
    return history;
}

export async function modelSave(model, path){
    return await model.save(path)
}

/**
 * Decode a buffer image to an rgb image
 */
export function decodeImage(buffer, imageName){
    let imageTensor = tf.node.decodeImage(buffer)
    return imageTensor
}

export function tensorResizeNearestNeighbor(tensor, tensor_size){
    return tensor.resizeNearestNeighbor([tensor_size, tensor_size])
}

export function tensorToFloat(tensor){
    return tensor.toFloat()
}

export function tensorDivScalar(tensor, scalarFactor){
    return tensor.div(tf.scalar(scalarFactor))
}

export function tensorExpandDims(tensor){
    return tensor.expandDims()
}

export function tfConcat(tensors){
    return tf.concat(tensors)
}

export function oneHot(array1d, length){
    return tf.oneHot(array1d, length)
}

export function tensor1D(inputs, type='int32'){
    return tf.tensor1d(inputs, type)
}

export function datasetToDatabaseUsableObject(dataset){
    return {
       xs: dataset.xs, ys: dataset.ys, labelMap: dataset.label_map
    }
}

/**
 * Image data augment
 */

export function addNoise(image, noiseLevel) {
    const noise = tf.randomNormal(image.shape, 0, noiseLevel);
    return image.add(noise).clipByValue(0, 255);
}

export function flipHorizontal(image) {
    return tf.image.flipLeftRight(image);
}

/**
 * 
 */

export function startScope(){
    tf.engine().startScope()
}

export function endScope(){
    tf.engine().endScope()
}

export function disposeVariables(){
    tf.engine().disposeVariables()
}

export function isTensorImageShape(tensor, size){
    const width = tensor.shape[1];
    const height = tensor.shape[0];
    return width === size && height === size
}