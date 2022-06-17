<SlidingUpPanel 
            // MinimumDistanceThreshold={50}
            draggableRange={{top: statusFilter ? 620 : ((locations?.length - activeItems?.length) * 70) + (activeItems?.length * 180), bottom: 125}}
            ref={c => setPanel(c)}
            Minimumvelocityhreshold={0.2}
            onMomentumDragEnd={(number) => setNumber(number)}
            >
                <View style={[styles.footer, {height: statusFilter ? 620 : ((locations?.length - activeItems?.length) * 70) + (activeItems?.length * 180)}]}>
                    <TouchableOpacity
                    onPress={() => panelHandler()}
                    style={styles.panel_header}
                    >
                    <View style={styles.block_hr} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                    onPress={(e) => panel.show(height * 60 / 100)}
                    >
                    <ScrollView style={{width: '100%', backgroundColor: 'red'}}> */}
                    {statusFilter ? (
                        <>
                            <View style={styles.header_footer}>
                                <Search data={null} searchHandler={null_func} setStrSearch={searchHandler} value={strSearch} />
                            </View>
                            <Text
                            style={[
                                GlobalStyle.CustomFontBold,
                                styles.panel_title
                            ]}
                            >
                                Информация
                            </Text>
                            {/* {
                                form?.map((item, index) => {
                                    return renderGetInput({data: item});
                                })
                            } */}
                            {form?.map((item, index) => (
                                <BooksForm data={{...item, change: changeRoot, value: finalForm, lang: dataLang.data, styles: {height: 40,}}}/>
                            ))}
                            <ButtonFull data={{value: 'Сохранить', change: saveFilterHandler}} />
                        </>
                    ) : (
                        <>
                            <View style={styles.header_footer}>
                                <TouchableOpacity 
                                onPress={() => setStatusFilter(true)}
                                style={Object.keys(finalForm).length !== 0 ? styles.buton_input : styles.buton_input_max}
                                >
                                    <Text
                                    style={[
                                        GlobalStyle.CustomFontRegular,
                                        finalForm?.search?.length ? styles.buton_input_text_active : styles.buton_input_text
                                    ]}
                                    >
                                        {finalForm?.search?.length ? finalForm?.search : 'Поиск'}
                                    </Text>
                                    <View style={styles.button_search}>
                                        <GlobalSvgSelector id='search' />
                                    </View>
                                </TouchableOpacity>
                                {Object.keys(finalForm).length !== 0 ? (
                                    <TouchableOpacity 
                                    onPress={() => clearFilterHandler()}
                                    style={styles.buton_clear}
                                    >
                                        <GlobalSvgSelector id='clear' />
                                    </TouchableOpacity>
                                ): null}
                            </View>
                            {locations?.map((item, index) => (
                                <CardMachine 
                                    key={index}
                                    icons={item.icons}
                                    address={item.address}
                                    data={item}
                                    title={item.name}
                                    statusHr={index !== locations?.length - 1}
                                    index={index}
                                    activeHandler={activeHandler}
                                    statusActive={activeItems?.indexOf(index) !== -1}
                                />
                            ))}
                        </>
                    )}
                </View>
            </SlidingUpPanel>